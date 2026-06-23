const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

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

  return {
    winner,
    player1Score: normalizeScore(result.player1Score),
    player2Score: normalizeScore(result.player2Score),
    reason: String(result.reason || '').slice(0, 300),
  };
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

  const prompt = `
Voc\u00ea \u00e9 o jurado oficial do jogo Draw Duel.

Tema da rodada:
${theme}

Jogador 1: ${player1Name}
Jogador 2: ${player2Name}

Analise os dois desenhos enviados.

Crit\u00e9rios:
- Representa\u00e7\u00e3o correta do tema
- Clareza visual
- Criatividade
- Qualidade geral do desenho

Escolha apenas um vencedor.

Responda SOMENTE em JSON:

{
  "winner": "player1" ou "player2",
  "player1Score": n\u00famero de 0 a 10,
  "player2Score": n\u00famero de 0 a 10,
  "reason": "explica\u00e7\u00e3o curta em portugu\u00eas"
}
`;

  // Send the prompt followed by player 1 image and player 2 image in the same order.
  const response = await model.generateContent([
    prompt,
    player1ImagePart,
    player2ImagePart,
  ]);

  const responseText = response.response.text();
  const parsedResult = JSON.parse(extractJson(responseText));

  return normalizeJudgement(parsedResult);
}

module.exports = {
  judgeDrawings,
};
