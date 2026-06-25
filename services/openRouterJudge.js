const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'qwen/qwen2.5-vl-32b-instruct:free';
const OPENROUTER_TIMEOUT_MS = Number(process.env.OPENROUTER_TIMEOUT_MS || 30000);
const OPENROUTER_MAX_ATTEMPTS = Number(process.env.OPENROUTER_MAX_ATTEMPTS || 2);

function createOpenRouterHeaders() {
  if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'sua_chave_aqui') {
    return null;
  }

  return {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': process.env.APP_URL || 'https://drawduel.onrender.com',
    'X-Title': 'Draw Duel',
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
    provider: 'openrouter',
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
    provider: 'openrouter',
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

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function withTimeout(promise, timeoutMs) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`OpenRouter request timed out after ${timeoutMs}ms.`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function sendOpenRouterRequest(messages) {
  const headers = createOpenRouterHeaders();

  if (!headers) {
    throw new Error('OPENROUTER_API_KEY is not configured.');
  }

  let lastError;

  for (let attempt = 1; attempt <= OPENROUTER_MAX_ATTEMPTS; attempt += 1) {
    try {
      const response = await withTimeout(fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages,
          temperature: 0.2,
          max_tokens: 500,
        }),
      }), OPENROUTER_TIMEOUT_MS);

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`OpenRouter ${response.status}: ${errorBody.slice(0, 300)}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      return JSON.parse(extractJson(content));
    } catch (error) {
      lastError = error;
      console.error(`OpenRouter attempt ${attempt}/${OPENROUTER_MAX_ATTEMPTS} failed: ${error.message}`);

      if (attempt < OPENROUTER_MAX_ATTEMPTS) {
        await sleep(400 * attempt);
      }
    }
  }

  throw lastError;
}

async function judgeDrawings({
  theme,
  player1Name,
  player2Name,
  player1Image,
  player2Image,
}) {
  const parsedResult = await sendOpenRouterRequest([
    {
      role: 'user',
      content: [
        { type: 'text', text: buildDuelJudgePrompt({ theme, player1Name, player2Name }) },
        { type: 'image_url', image_url: { url: player1Image } },
        { type: 'image_url', image_url: { url: player2Image } },
      ],
    },
  ]);

  return normalizeJudgement(parsedResult);
}

async function judgeSoloDrawing({
  theme,
  playerName,
  playerImage,
}) {
  const prompt = `
Voc\u00ea \u00e9 o jurado oficial do modo solo do jogo Draw Duel.

Tema da rodada:
${theme}

Jogador: ${playerName}

Analise o desenho enviado.

D\u00ea uma nota de 0 a 10 e explique brevemente o que achou do desenho.

Responda SOMENTE em JSON:

{
  "score": n\u00famero de 0 a 10,
  "reason": "explica\u00e7\u00e3o curta em portugu\u00eas",
  "reasonPt": "explica\u00e7\u00e3o curta em portugu\u00eas",
  "reasonEn": "short explanation in English"
}
`;

  const parsedResult = await sendOpenRouterRequest([
    {
      role: 'user',
      content: [
        { type: 'text', text: prompt },
        { type: 'image_url', image_url: { url: playerImage } },
      ],
    },
  ]);

  return normalizeSoloJudgement(parsedResult);
}

module.exports = {
  judgeDrawings,
  judgeSoloDrawing,
};
