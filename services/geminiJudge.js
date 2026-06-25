const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const GEMINI_TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS || 30000);
const GEMINI_MAX_ATTEMPTS = Number(process.env.GEMINI_MAX_ATTEMPTS || 3);

function createGeminiClient() {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'sua_chave_aqui') {
    return null;
  }

  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

function dataUrlToGeminiPart(dataUrl) {
  const match = String(dataUrl).match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

  if (!match) {
    throw new Error('Invalid canvas Data URL.');
  }

  const [, mimeType, base64Data] = match;

  // Gemini expects inline image data split into MIME type and raw base64 content.
  return {
    inlineData: {
      mimeType,
      data: base64Data,
    },
  };
}

function extractJson(text) {
  const cleanedText = String(text || '').trim();
  const fencedMatch = cleanedText.match(/```(?:json)?\s*([\s\S]*?)```/i);

  if (fencedMatch) {
    return fencedMatch[1].trim();
  }

  const firstBraceIndex = cleanedText.indexOf('{');
  const lastBraceIndex = cleanedText.lastIndexOf('}');

  if (firstBraceIndex !== -1 && lastBraceIndex !== -1 && lastBraceIndex > firstBraceIndex) {
    return cleanedText.slice(firstBraceIndex, lastBraceIndex + 1);
  }

  return cleanedText;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function withTimeout(promise, timeoutMs) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Gemini request timed out after ${timeoutMs}ms.`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function generateJsonWithRetry(model, parts) {
  let lastError;

  for (let attempt = 1; attempt <= GEMINI_MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await withTimeout(model.generateContent(parts), GEMINI_TIMEOUT_MS);
      const responseText = response.response.text();
      return JSON.parse(extractJson(responseText));
    } catch (error) {
      lastError = error;
      console.error(`Gemini attempt ${attempt}/${GEMINI_MAX_ATTEMPTS} failed: ${error.message}`);

      if (attempt < GEMINI_MAX_ATTEMPTS) {
        await sleep(350 * attempt);
      }
    }
  }

  throw lastError;
}

function normalizeScore(score) {
  const numericScore = Number(score);

  if (Number.isNaN(numericScore)) {
    return 0;
  }

  return Math.max(0, Math.min(10, numericScore));
}

function normalizeJudgement(result) {
  const winner = result.winner === 'player2' ? 'player2' : 'player1';
  const reasonPt = String(result.reasonPt || result.reason || '').slice(0, 300);
  const reasonEn = String(result.reasonEn || result.reason || '').slice(0, 300);

  return {
    winner,
    player1Score: normalizeScore(result.player1Score),
    player2Score: normalizeScore(result.player2Score),
    reason: reasonPt,
    reasonPt,
    reasonEn,
  };
}

function normalizeSoloJudgement(result) {
  const reasonPt = String(result.reasonPt || result.reason || '').slice(0, 300);
  const reasonEn = String(result.reasonEn || result.reason || '').slice(0, 300);

  return {
    score: normalizeScore(result.score),
    reason: reasonPt,
    reasonPt,
    reasonEn,
  };
}

function buildDuelJudgePrompt({ theme, player1Name, player2Name }) {
  return `
Voc\u00ea \u00e9 o jurado oficial do jogo Draw Duel.

Tema da rodada:
"${theme}"

Jogador 1: ${player1Name}
Jogador 2: ${player2Name}

Voc\u00ea receber\u00e1 dois desenhos.

Sua miss\u00e3o \u00e9 decidir QUAL \u00c9 O MELHOR DESENHO.

Crit\u00e9rios de avalia\u00e7\u00e3o (em ordem de import\u00e2ncia):

1. O desenho representa corretamente o tema?
2. Qualidade art\u00edstica.
3. Criatividade.
4. N\u00edvel de detalhes.
5. Clareza visual.

Regras IMPORTANTES:

- O tema deve estar corretamente representado.
- Se apenas um desenho representar corretamente o tema, ele deve vencer.
- Se ambos representarem corretamente o tema, escolha aquele que for artisticamente melhor.
- Valorize criatividade, composi\u00e7\u00e3o, detalhes e acabamento.
- Um desenho bonito e criativo deve vencer um desenho simples quando ambos representam corretamente o tema.
- Nunca escolha um desenho apenas porque \u00e9 bonito se ele n\u00e3o representar o tema corretamente.
- Nunca declare empate.
- Sempre escolha apenas um vencedor.
- Se ambos forem ruins, escolha o menos ruim.
- Se ambos forem excelentes, escolha o mais bonito, criativo e bem executado.
- Utilize exclusivamente os nomes "${player1Name}" e "${player2Name}" nas explica\u00e7\u00f5es.
- Nunca escreva "Jogador 1", "Jogador 2", "Player 1" ou "Player 2".
- Responda SOMENTE com JSON v\u00e1lido.
- N\u00e3o utilize markdown.
- N\u00e3o utilize blocos \`\`\`.
- N\u00e3o escreva nenhum texto fora do JSON.

As notas devem refletir a qualidade geral do desenho, e n\u00e3o apenas quem venceu.

Responda exatamente neste formato:

{
  "winner": "player1" ou "player2",
  "player1Score": n\u00famero entre 0 e 10,
  "player2Score": n\u00famero entre 0 e 10,
  "reasonPt": "Explica\u00e7\u00e3o curta em portugu\u00eas citando os nomes dos jogadores.",
  "reasonEn": "Short explanation in English mentioning the players' names."
}
`;
}

async function judgeDrawings({
  theme,
  player1Name,
  player2Name,
  player1Image,
  player2Image,
}) {
  const genAI = createGeminiClient();

  if (!genAI) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }

  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2,
    },
  });

  // The canvas sends base64 Data URLs. Convert each one into Gemini inline image parts.
  const player1ImagePart = dataUrlToGeminiPart(player1Image);
  const player2ImagePart = dataUrlToGeminiPart(player2Image);

  // Send the prompt followed by player 1 image and player 2 image in the same order.
  const parsedResult = await generateJsonWithRetry(model, [
    buildDuelJudgePrompt({ theme, player1Name, player2Name }),
    player1ImagePart,
    player2ImagePart,
  ]);

  return normalizeJudgement(parsedResult);
}

async function judgeSoloDrawing({
  theme,
  playerName,
  playerImage,
}) {
  const genAI = createGeminiClient();

  if (!genAI) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }

  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2,
    },
  });

  const playerImagePart = dataUrlToGeminiPart(playerImage);

  const prompt = `
Voc\u00ea \u00e9 o jurado oficial do modo solo do jogo Draw Duel.

Tema da rodada:
${theme}

Jogador: ${playerName}

Analise o desenho enviado.

Crit\u00e9rios:
- Representa\u00e7\u00e3o correta do tema
- Clareza visual
- Criatividade
- Qualidade geral do desenho

D\u00ea uma nota de 0 a 10 e explique brevemente o que achou do desenho.
Use o nome real "${playerName}" se mencionar o jogador.

Responda SOMENTE em JSON:

{
  "score": n\u00famero de 0 a 10,
  "reason": "explica\u00e7\u00e3o curta em portugu\u00eas",
  "reasonPt": "explica\u00e7\u00e3o curta em portugu\u00eas",
  "reasonEn": "short explanation in English"
}
`;

  const parsedResult = await generateJsonWithRetry(model, [
    prompt,
    playerImagePart,
  ]);

  return normalizeSoloJudgement(parsedResult);
}

module.exports = {
  judgeDrawings,
  judgeSoloDrawing,
};
