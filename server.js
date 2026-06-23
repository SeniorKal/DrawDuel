require('dotenv').config();

const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { judgeDrawings: judgeDrawingsWithGemini } = require('./services/geminiJudge');

const THEMES = [
  'Gato',
  'Cachorro',
  'Drag\u00e3o',
  'Rob\u00f4',
  'Astronauta',
  'Dinossauro',
  'Castelo',
];

const PORT = 3000;
const ROOM_CODE_LENGTH = 6;
const DUEL_DURATION_SECONDS = 60;
const rooms = new Map();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (request, response) => {
  response.json({
    status: 'ok',
    project: 'Draw Duel',
  });
});

function emitRoomError(socketOrRoom, messageKey, fallbackMessage) {
  socketOrRoom.emit('room-error', {
    messageKey,
    message: fallbackMessage,
  });
}

function emitRoomState(roomCode) {
  const room = rooms.get(roomCode);

  if (!room) {
    return;
  }

  io.to(roomCode).emit('room-state', {
    roomCode,
    status: room.status,
    players: room.players.map((player) => ({
      nickname: player.nickname,
      ready: player.ready,
    })),
  });
}

function generateRoomCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let roomCode = '';

  for (let index = 0; index < ROOM_CODE_LENGTH; index += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    roomCode += characters[randomIndex];
  }

  return roomCode;
}

function createRoom(socket, nickname) {
  if (!nickname) {
    emitRoomError(socket, 'nicknameRequired', 'Digite um nickname.');
    return;
  }

  let roomCode = generateRoomCode();

  while (rooms.has(roomCode)) {
    roomCode = generateRoomCode();
  }

  const room = {
    code: roomCode,
    players: [{ socketId: socket.id, nickname, ready: false }],
    theme: null,
    drawings: [],
    status: 'waiting',
  };

  rooms.set(roomCode, room);
  socket.join(roomCode);
  socket.data.roomCode = roomCode;
  socket.data.nickname = nickname;

  console.log(`sala criada: ${roomCode} por ${nickname}`);
  socket.emit('room-created', { roomCode });
  emitRoomState(roomCode);
}

function joinRoom(socket, nickname, requestedRoomCode) {
  const roomCode = requestedRoomCode.trim().toUpperCase();

  if (!nickname) {
    emitRoomError(socket, 'nicknameRequired', 'Digite um nickname.');
    return;
  }

  if (!roomCode) {
    emitRoomError(socket, 'roomCodeRequired', 'Digite o c\u00f3digo da sala.');
    return;
  }

  const room = rooms.get(roomCode);

  if (!room) {
    emitRoomError(socket, 'roomNotFound', 'Sala n\u00e3o encontrada.');
    return;
  }

  if (room.players.length >= 2 || room.status !== 'waiting') {
    emitRoomError(socket, 'roomFullOrStarted', 'Sala cheia ou duelo j\u00e1 iniciado.');
    return;
  }

  room.players.push({ socketId: socket.id, nickname, ready: false });
  socket.join(roomCode);
  socket.data.roomCode = roomCode;
  socket.data.nickname = nickname;

  console.log(`jogador entrou na sala: ${nickname} em ${roomCode}`);
  socket.emit('room-joined', { roomCode });
  emitRoomState(roomCode);
}

function markPlayerReady(socket) {
  const { roomCode } = socket.data;

  if (!roomCode || !rooms.has(roomCode)) {
    emitRoomError(socket, 'roomNotFound', 'Sala n\u00e3o encontrada.');
    return;
  }

  const room = rooms.get(roomCode);

  if (room.status !== 'waiting') {
    emitRoomError(socket, 'roomFullOrStarted', 'Sala cheia ou duelo j\u00e1 iniciado.');
    return;
  }

  const player = room.players.find((item) => item.socketId === socket.id);

  if (!player) {
    emitRoomError(socket, 'playerNotInRoom', 'Jogador n\u00e3o pertence a esta sala.');
    return;
  }

  player.ready = true;
  emitRoomState(roomCode);

  if (room.players.length === 2 && room.players.every((item) => item.ready)) {
    startDuel(roomCode);
  }
}

function startDuel(roomCode) {
  const room = rooms.get(roomCode);

  if (!room || room.players.length !== 2) {
    return;
  }

  const themeIndex = Math.floor(Math.random() * THEMES.length);
  room.theme = THEMES[themeIndex];
  room.status = 'playing';
  room.drawings = [];
  room.players.forEach((player) => {
    player.ready = false;
  });

  const startsAt = Date.now() + 1000;
  const endsAt = startsAt + DUEL_DURATION_SECONDS * 1000;

  room.players.forEach((player) => {
    const opponent = room.players.find((item) => item.socketId !== player.socketId);

    io.to(player.socketId).emit('duel-started', {
      roomCode,
      theme: room.theme,
      opponentNickname: opponent.nickname,
      durationSeconds: DUEL_DURATION_SECONDS,
      serverNow: Date.now(),
      startsAt,
      endsAt,
    });
  });

  console.log(`duelo iniciado: ${roomCode}`);
}

async function submitDrawing(socket, payload) {
  const roomCode = String(payload.roomCode || '').trim().toUpperCase();
  const room = rooms.get(roomCode);

  if (!room || room.status !== 'playing') {
    emitRoomError(socket, 'duelUnavailable', 'Duelo n\u00e3o encontrado ou j\u00e1 encerrado.');
    return;
  }

  const player = room.players.find((item) => item.socketId === socket.id);

  if (!player) {
    emitRoomError(socket, 'playerNotInRoom', 'Jogador n\u00e3o pertence a esta sala.');
    return;
  }

  const existingDrawing = room.drawings.find((drawing) => drawing.socketId === socket.id);

  if (existingDrawing) {
    return;
  }

  room.drawings.push({
    socketId: socket.id,
    nickname: payload.nickname || player.nickname,
    drawingDataUrl: payload.drawingDataUrl,
    language: payload.language || 'pt-BR',
  });

  console.log(`desenho recebido: ${player.nickname} em ${roomCode}`);

  if (room.drawings.length === 2) {
    await finishDuel(roomCode);
  }
}

function getFallbackJudgement(room, errorMessage) {
  const winnerIndex = Math.floor(Math.random() * room.players.length);
  const winner = winnerIndex === 0 ? 'player1' : 'player2';
  const winnerName = room.players[winnerIndex].nickname;
  const reason = 'A avalia\u00e7\u00e3o do Gemini falhou, ent\u00e3o um vencedor aleat\u00f3rio foi escolhido.';

  console.error(`Gemini judge failed. Using fallback judgement: ${errorMessage}`);

  return {
    winner,
    winnerName,
    player1Score: winner === 'player1' ? 7 : 6,
    player2Score: winner === 'player2' ? 7 : 6,
    reason,
  };
}

async function finishDuel(roomCode) {
  const room = rooms.get(roomCode);

  if (!room || room.drawings.length !== 2) {
    return;
  }

  room.status = 'judging';
  const player1 = room.players[0];
  const player2 = room.players[1];
  const player1Drawing = room.drawings.find((drawing) => drawing.socketId === player1.socketId);
  const player2Drawing = room.drawings.find((drawing) => drawing.socketId === player2.socketId);
  let judgement;

  try {
    // Send the completed duel to the Gemini judge service and wait for the verdict.
    judgement = await judgeDrawingsWithGemini({
      theme: room.theme,
      player1Name: player1.nickname,
      player2Name: player2.nickname,
      player1Image: player1Drawing.drawingDataUrl,
      player2Image: player2Drawing.drawingDataUrl,
    });
  } catch (error) {
    // If Gemini is unavailable or returns invalid JSON, keep the match flow alive with a random winner.
    judgement = getFallbackJudgement(room, error.message);
  }

  const winnerName = judgement.winner === 'player1' ? player1.nickname : player2.nickname;

  room.status = 'finished';
  room.judgement = {
    ...judgement,
    winnerName,
  };

  io.to(roomCode).emit('duel-result', {
    roomCode,
    theme: room.theme,
    player1Nickname: player1.nickname,
    player2Nickname: player2.nickname,
    player1Drawing,
    player2Drawing,
    winner: judgement.winner,
    winnerName,
    player1Score: judgement.player1Score,
    player2Score: judgement.player2Score,
    reason: judgement.reason,
  });

  console.log(`duelo finalizado: ${roomCode}`);
}

function removePlayerFromRoom(socket) {
  const { roomCode } = socket.data;

  if (!roomCode || !rooms.has(roomCode)) {
    return;
  }

  const room = rooms.get(roomCode);
  room.players = room.players.filter((player) => player.socketId !== socket.id);

  if (room.players.length === 0) {
    rooms.delete(roomCode);
    return;
  }

  if (room.status !== 'finished') {
    room.status = 'waiting';
    room.drawings = [];
    emitRoomError(
      io.to(roomCode),
      'opponentLeft',
      'O advers\u00e1rio saiu da sala. Crie ou entre em uma nova sala.'
    );
  }
}

io.on('connection', (socket) => {
  console.log(`jogador conectado: ${socket.id}`);

  socket.on('create-room', ({ nickname }) => {
    createRoom(socket, String(nickname || '').trim());
  });

  socket.on('join-room', ({ nickname, roomCode }) => {
    joinRoom(socket, String(nickname || '').trim(), String(roomCode || ''));
  });

  socket.on('player-ready', () => {
    markPlayerReady(socket);
  });

  socket.on('submit-drawing', async (payload) => {
    await submitDrawing(socket, payload);
  });

  socket.on('disconnect', () => {
    removePlayerFromRoom(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Draw Duel server running at http://localhost:${PORT}`);
});
