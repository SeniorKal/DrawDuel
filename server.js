const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

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
    socket.emit('room-error', { message: 'Digite um nickname.' });
    return;
  }

  let roomCode = generateRoomCode();

  while (rooms.has(roomCode)) {
    roomCode = generateRoomCode();
  }

  const room = {
    code: roomCode,
    players: [{ socketId: socket.id, nickname }],
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
}

function joinRoom(socket, nickname, requestedRoomCode) {
  const roomCode = requestedRoomCode.trim().toUpperCase();

  if (!nickname) {
    socket.emit('room-error', { message: 'Digite um nickname.' });
    return;
  }

  if (!roomCode) {
    socket.emit('room-error', { message: 'Digite o c\u00f3digo da sala.' });
    return;
  }

  const room = rooms.get(roomCode);

  if (!room) {
    socket.emit('room-error', { message: 'Sala n\u00e3o encontrada.' });
    return;
  }

  if (room.players.length >= 2 || room.status !== 'waiting') {
    socket.emit('room-error', { message: 'Sala cheia ou duelo j\u00e1 iniciado.' });
    return;
  }

  room.players.push({ socketId: socket.id, nickname });
  socket.join(roomCode);
  socket.data.roomCode = roomCode;
  socket.data.nickname = nickname;

  console.log(`jogador entrou na sala: ${nickname} em ${roomCode}`);
  socket.emit('room-joined', { roomCode });

  if (room.players.length === 2) {
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

  const startsAt = Date.now() + 1000;
  const endsAt = startsAt + DUEL_DURATION_SECONDS * 1000;

  room.players.forEach((player) => {
    const opponent = room.players.find((item) => item.socketId !== player.socketId);

    io.to(player.socketId).emit('duel-started', {
      roomCode,
      theme: room.theme,
      opponentNickname: opponent.nickname,
      durationSeconds: DUEL_DURATION_SECONDS,
      startsAt,
      endsAt,
    });
  });

  console.log(`duelo iniciado: ${roomCode}`);
}

function submitDrawing(socket, payload) {
  const roomCode = String(payload.roomCode || '').trim().toUpperCase();
  const room = rooms.get(roomCode);

  if (!room || room.status !== 'playing') {
    socket.emit('room-error', { message: 'Duelo n\u00e3o encontrado ou j\u00e1 encerrado.' });
    return;
  }

  const player = room.players.find((item) => item.socketId === socket.id);

  if (!player) {
    socket.emit('room-error', { message: 'Jogador n\u00e3o pertence a esta sala.' });
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
  });

  console.log(`desenho recebido: ${player.nickname} em ${roomCode}`);

  if (room.drawings.length === 2) {
    finishDuel(roomCode);
  }
}

function finishDuel(roomCode) {
  const room = rooms.get(roomCode);

  if (!room || room.drawings.length !== 2) {
    return;
  }

  room.status = 'finished';
  const winner = room.players[Math.floor(Math.random() * room.players.length)];

  room.players.forEach((player) => {
    const ownDrawing = room.drawings.find((drawing) => drawing.socketId === player.socketId);
    const opponentDrawing = room.drawings.find((drawing) => drawing.socketId !== player.socketId);

    io.to(player.socketId).emit('drawings-ready', {
      roomCode,
      theme: room.theme,
      winnerNickname: winner.nickname,
      ownDrawing,
      opponentDrawing,
    });
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
    io.to(roomCode).emit('room-error', {
      message: 'O advers\u00e1rio saiu da sala. Crie ou entre em uma nova sala.',
    });
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

  socket.on('submit-drawing', (payload) => {
    submitDrawing(socket, payload);
  });

  socket.on('disconnect', () => {
    removePlayerFromRoom(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Draw Duel server running at http://localhost:${PORT}`);
});
