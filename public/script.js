const GAME_DURATION_SECONDS = 60;
const DEFAULT_BRUSH_COLOR = '#111827';
const DEFAULT_BRUSH_SIZE = 5;
const ERASER_COLOR = '#ffffff';
const THEMES = [
  'cat',
  'dog',
  'dragon',
  'robot',
  'astronaut',
  'dinosaur',
  'castle',
];

const TRANSLATIONS = {
  'pt-BR': {
    settingsButton: 'Ajustes',
    settingsPanelLabel: 'Ajustes do jogo',
    settingsTitle: 'Ajustes',
    darkMode: 'Modo escuro',
    language: 'Idioma',
    startScreenLabel: 'Tela inicial',
    menuDescription: 'Escolha como quer jogar e mostre seu desenho antes do tempo acabar.',
    nicknamePlaceholder: 'Ex: PixelMaster',
    gameModesLabel: 'Modos de jogo',
    soloMode: 'Jogo Solo',
    soloModeDescription: 'Treine contra o tempo',
    friendsMode: 'Jogo com Amigos',
    friendsModeDescription: 'Crie ou entre em uma sala',
    createRoom: 'Criar Sala',
    roomCode: 'C\u00f3digo da Sala',
    roomCodePlaceholder: 'Ex: AB12CD',
    joinRoom: 'Entrar na Sala',
    waitingScreenLabel: 'Sala de espera',
    roomCreated: 'Sala criada',
    roomCodeTitle: 'C\u00f3digo da sala',
    waitingPlayer: 'Aguardando outro jogador...',
    gameScreenLabel: 'Tela de jogo',
    player: 'Jogador',
    opponent: 'Advers\u00e1rio',
    theme: 'Tema',
    time: 'Tempo',
    drawingToolsLabel: 'Ferramentas de desenho',
    color: 'Cor',
    thickness: 'Espessura',
    brush: 'Pincel',
    eraser: 'Borracha',
    canvasLabel: 'Canvas de desenho',
    clearDrawing: 'Limpar Desenho',
    leaveDuel: 'Sair do Duelo',
    resultScreenLabel: 'Resultado do duelo',
    result: 'Resultado',
    aiNotImplemented: 'IA ainda n\u00e3o implementada',
    room: 'Sala',
    yourDrawing: 'Seu desenho',
    opponentDrawing: 'Desenho do advers\u00e1rio',
    ownDrawingAlt: 'Seu desenho final',
    opponentDrawingAlt: 'Desenho final do advers\u00e1rio',
    soloNicknameRequired: 'Digite um nickname para jogar solo.',
    createNicknameRequired: 'Digite um nickname para criar uma sala.',
    joinNicknameRequired: 'Digite um nickname para entrar na sala.',
    roomCodeRequired: 'Digite o c\u00f3digo da sala.',
    privateRoomHint: 'Crie uma sala ou entre com um c\u00f3digo.',
    soloOpponent: 'Treino solo',
    preparing: 'Prepare-se...',
    timeEndedSending: 'Tempo encerrado! Enviando desenho...',
    soloFinished: 'Treino solo finalizado',
    fakeWinner: 'Vencedor fake: {name}',
    fakeWinnerEmpty: 'Vencedor fake: -',
    connecting: 'Conectando ao servidor...',
    joiningRoom: 'Entrando na sala...',
    connectionFailed: 'N\u00e3o foi poss\u00edvel conectar ao servidor.',
    backToMenu: 'Voltar ao Menu',
    nicknameRequired: 'Digite um nickname.',
    roomNotFound: 'Sala n\u00e3o encontrada.',
    roomFullOrStarted: 'Sala cheia ou duelo j\u00e1 iniciado.',
    duelUnavailable: 'Duelo n\u00e3o encontrado ou j\u00e1 encerrado.',
    playerNotInRoom: 'Jogador n\u00e3o pertence a esta sala.',
    opponentLeft: 'O advers\u00e1rio saiu da sala. Crie ou entre em uma nova sala.',
  },
  en: {
    settingsButton: 'Settings',
    settingsPanelLabel: 'Game settings',
    settingsTitle: 'Settings',
    darkMode: 'Dark mode',
    language: 'Language',
    startScreenLabel: 'Start screen',
    menuDescription: 'Choose how you want to play and draw before time runs out.',
    nicknamePlaceholder: 'Ex: PixelMaster',
    gameModesLabel: 'Game modes',
    soloMode: 'Solo Game',
    soloModeDescription: 'Practice against the clock',
    friendsMode: 'Play with Friends',
    friendsModeDescription: 'Create or join a room',
    createRoom: 'Create Room',
    roomCode: 'Room Code',
    roomCodePlaceholder: 'Ex: AB12CD',
    joinRoom: 'Join Room',
    waitingScreenLabel: 'Waiting room',
    roomCreated: 'Room created',
    roomCodeTitle: 'Room code',
    waitingPlayer: 'Waiting for another player...',
    gameScreenLabel: 'Game screen',
    player: 'Player',
    opponent: 'Opponent',
    theme: 'Theme',
    time: 'Time',
    drawingToolsLabel: 'Drawing tools',
    color: 'Color',
    thickness: 'Thickness',
    brush: 'Brush',
    eraser: 'Eraser',
    canvasLabel: 'Drawing canvas',
    clearDrawing: 'Clear Drawing',
    leaveDuel: 'Leave Duel',
    resultScreenLabel: 'Duel result',
    result: 'Result',
    aiNotImplemented: 'AI not implemented yet',
    room: 'Room',
    yourDrawing: 'Your drawing',
    opponentDrawing: 'Opponent drawing',
    ownDrawingAlt: 'Your final drawing',
    opponentDrawingAlt: 'Opponent final drawing',
    soloNicknameRequired: 'Enter a nickname to play solo.',
    createNicknameRequired: 'Enter a nickname to create a room.',
    joinNicknameRequired: 'Enter a nickname to join the room.',
    roomCodeRequired: 'Enter the room code.',
    privateRoomHint: 'Create a room or join with a code.',
    soloOpponent: 'Solo practice',
    preparing: 'Get ready...',
    timeEndedSending: 'Time is up! Sending drawing...',
    soloFinished: 'Solo practice finished',
    fakeWinner: 'Fake winner: {name}',
    fakeWinnerEmpty: 'Fake winner: -',
    connecting: 'Connecting to server...',
    joiningRoom: 'Joining room...',
    connectionFailed: 'Could not connect to the server.',
    backToMenu: 'Back to Menu',
    nicknameRequired: 'Enter a nickname.',
    roomNotFound: 'Room not found.',
    roomFullOrStarted: 'Room is full or the duel has already started.',
    duelUnavailable: 'Duel not found or already finished.',
    playerNotInRoom: 'Player does not belong to this room.',
    opponentLeft: 'The opponent left the room. Create or join a new room.',
  },
};

const THEME_TRANSLATIONS = {
  cat: { 'pt-BR': 'Gato', en: 'Cat' },
  dog: { 'pt-BR': 'Cachorro', en: 'Dog' },
  dragon: { 'pt-BR': 'Drag\u00e3o', en: 'Dragon' },
  robot: { 'pt-BR': 'Rob\u00f4', en: 'Robot' },
  astronaut: { 'pt-BR': 'Astronauta', en: 'Astronaut' },
  dinosaur: { 'pt-BR': 'Dinossauro', en: 'Dinosaur' },
  castle: { 'pt-BR': 'Castelo', en: 'Castle' },
};

const THEME_ALIASES = {
  Gato: 'cat',
  Cachorro: 'dog',
  'Drag\u00e3o': 'dragon',
  'Rob\u00f4': 'robot',
  Astronauta: 'astronaut',
  Dinossauro: 'dinosaur',
  Castelo: 'castle',
};

const socket = window.io ? window.io({ autoConnect: false }) : null;

const settingsButton = document.getElementById('settingsButton');
const settingsPanel = document.getElementById('settingsPanel');
const ptLanguageButton = document.getElementById('ptLanguageButton');
const enLanguageButton = document.getElementById('enLanguageButton');
const startScreen = document.getElementById('startScreen');
const waitingScreen = document.getElementById('waitingScreen');
const gameScreen = document.getElementById('gameScreen');
const resultScreen = document.getElementById('resultScreen');
const nicknameInput = document.getElementById('nicknameInput');
const roomCodeInput = document.getElementById('roomCodeInput');
const soloModeButton = document.getElementById('soloModeButton');
const friendsModeButton = document.getElementById('friendsModeButton');
const privateRoomPanel = document.getElementById('privateRoomPanel');
const createRoomButton = document.getElementById('createRoomButton');
const joinRoomButton = document.getElementById('joinRoomButton');
const startMessage = document.getElementById('startMessage');
const roomCodeDisplay = document.getElementById('roomCodeDisplay');
const backToMenuButton = document.getElementById('backToMenuButton');
const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const playerDisplay = document.getElementById('playerDisplay');
const opponentDisplay = document.getElementById('opponentDisplay');
const themeDisplay = document.getElementById('themeDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const brushColorInput = document.getElementById('brushColorInput');
const brushSizeInput = document.getElementById('brushSizeInput');
const brushSizeDisplay = document.getElementById('brushSizeDisplay');
const brushButton = document.getElementById('brushButton');
const eraserButton = document.getElementById('eraserButton');
const clearButton = document.getElementById('clearButton');
const resetButton = document.getElementById('resetButton');
const statusMessage = document.getElementById('statusMessage');
const resultRoom = document.getElementById('resultRoom');
const resultTheme = document.getElementById('resultTheme');
const winnerMessage = document.getElementById('winnerMessage');
const ownResultImage = document.getElementById('ownResultImage');
const opponentResultCard = document.getElementById('opponentResultCard');
const opponentResultImage = document.getElementById('opponentResultImage');

let currentPlayer = '';
let currentRoomCode = '';
let currentTheme = '';
let currentOpponentNickname = '';
let isDrawing = false;
let isCanvasLocked = true;
let hasSubmittedDrawing = false;
let timeRemaining = GAME_DURATION_SECONDS;
let timerId = null;
let gameStartTimeoutId = null;
let brushColor = DEFAULT_BRUSH_COLOR;
let brushSize = DEFAULT_BRUSH_SIZE;
let isEraserActive = false;
let isSoloMode = false;
let currentLanguage = 'pt-BR';
let lastWinnerNickname = '';

function handleSoloMode() {
  const nickname = getNickname();

  if (!nickname) {
    showStartMessage(t('soloNicknameRequired'), true);
    nicknameInput.focus();
    return;
  }

  currentPlayer = nickname;
  isSoloMode = true;

  const startsAt = Date.now() + 600;

  startGame({
    roomCode: 'SOLO',
    theme: getRandomTheme(),
    opponentNickname: t('soloOpponent'),
    durationSeconds: GAME_DURATION_SECONDS,
    startsAt,
    endsAt: startsAt + GAME_DURATION_SECONDS * 1000,
  });
}

function handleFriendsMode() {
  privateRoomPanel.hidden = false;
  friendsModeButton.classList.add('is-selected');
  soloModeButton.classList.remove('is-selected');
  showStartMessage(t('privateRoomHint'), false);
}

function handleCreateRoom() {
  const nickname = getNickname();

  if (!nickname) {
    showStartMessage(t('createNicknameRequired'), true);
    nicknameInput.focus();
    return;
  }

  currentPlayer = nickname;
  isSoloMode = false;
  connectSocket(() => {
    socket.emit('create-room', { nickname });
  });
}

function handleJoinRoom() {
  const nickname = getNickname();
  const roomCode = getRoomCode();

  if (!nickname) {
    showStartMessage(t('joinNicknameRequired'), true);
    nicknameInput.focus();
    return;
  }

  if (!roomCode) {
    showStartMessage(t('roomCodeRequired'), true);
    roomCodeInput.focus();
    return;
  }

  currentPlayer = nickname;
  isSoloMode = false;
  connectSocket(() => {
    socket.emit('join-room', { nickname, roomCode });
  });
}

function startGame(payload) {
  currentRoomCode = payload.roomCode;
  currentTheme = payload.theme;
  currentOpponentNickname = payload.opponentNickname;
  timeRemaining = payload.durationSeconds;
  hasSubmittedDrawing = false;
  isDrawing = false;
  isCanvasLocked = true;

  clearTimeout(gameStartTimeoutId);
  clearCanvas(true);
  prepareCanvas();
  updateGameInfo(payload.opponentNickname);
  updateTimerDisplay();

  startScreen.hidden = true;
  waitingScreen.hidden = true;
  resultScreen.hidden = true;
  gameScreen.hidden = false;
  clearButton.disabled = true;
  setToolControlsDisabled(true);
  canvas.classList.add('is-locked');
  statusMessage.textContent = t('preparing');

  const delayUntilStart = Math.max(payload.startsAt - Date.now(), 0);

  gameStartTimeoutId = setTimeout(() => {
    isCanvasLocked = false;
    clearButton.disabled = false;
    setToolControlsDisabled(false);
    canvas.classList.remove('is-locked');
    statusMessage.textContent = '';
    startTimer(payload.endsAt);
  }, delayUntilStart);
}

function startTimer(endsAt) {
  clearInterval(timerId);

  timerId = setInterval(() => {
    timeRemaining = Math.max(Math.ceil((endsAt - Date.now()) / 1000), 0);
    updateTimerDisplay();

    if (timeRemaining <= 0) {
      endGame();
    }
  }, 250);
}

function endGame() {
  if (hasSubmittedDrawing) {
    return;
  }

  clearInterval(timerId);
  clearTimeout(gameStartTimeoutId);
  isCanvasLocked = true;
  isDrawing = false;
  hasSubmittedDrawing = true;

  canvas.classList.add('is-locked');
  clearButton.disabled = true;
  setToolControlsDisabled(true);
  statusMessage.textContent = t('timeEndedSending');
  submitDrawing();
}

function submitDrawing() {
  if (isSoloMode) {
    showResult({
      roomCode: 'SOLO',
      theme: currentTheme,
      winnerNickname: currentPlayer,
      ownDrawing: {
        nickname: currentPlayer,
        drawingDataUrl: getCanvasImage(),
      },
      opponentDrawing: null,
    });
    return;
  }

  socket.emit('submit-drawing', {
    roomCode: currentRoomCode,
    nickname: currentPlayer,
    drawingDataUrl: getCanvasImage(),
  });
}

function showResult(payload) {
  clearInterval(timerId);
  clearTimeout(gameStartTimeoutId);

  resultRoom.textContent = payload.roomCode;
  resultTheme.textContent = translateTheme(payload.theme);
  lastWinnerNickname = payload.winnerNickname || '';
  winnerMessage.textContent = isSoloMode
    ? t('soloFinished')
    : t('fakeWinner').replace('{name}', payload.winnerNickname);
  ownResultImage.src = payload.ownDrawing.drawingDataUrl;
  opponentResultCard.hidden = !payload.opponentDrawing;

  if (payload.opponentDrawing) {
    opponentResultImage.src = payload.opponentDrawing.drawingDataUrl;
  } else {
    opponentResultImage.removeAttribute('src');
  }

  gameScreen.hidden = true;
  resultScreen.hidden = false;
  statusMessage.textContent = '';
}

function clearCanvas(force = false) {
  if (!force && isCanvasLocked) {
    return;
  }

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function getCanvasImage() {
  return canvas.toDataURL('image/png');
}

function prepareCanvas() {
  applyCurrentTool();
}

function connectSocket(callback) {
  if (!socket) {
    showStartMessage(t('connectionFailed'), true);
    updateStartButtons();
    return;
  }

  setActionButtonsDisabled(true);
  showStartMessage(t('connecting'), false);

  if (socket.connected) {
    callback();
    return;
  }

  socket.connect();
  socket.once('connect', callback);
}

function resetGame() {
  clearInterval(timerId);
  clearTimeout(gameStartTimeoutId);

  if (socket && socket.connected) {
    socket.disconnect();
  }

  currentPlayer = '';
  currentRoomCode = '';
  currentTheme = '';
  currentOpponentNickname = '';
  isDrawing = false;
  isCanvasLocked = true;
  hasSubmittedDrawing = false;
  timeRemaining = GAME_DURATION_SECONDS;
  isSoloMode = false;

  nicknameInput.value = '';
  roomCodeInput.value = '';
  privateRoomPanel.hidden = true;
  soloModeButton.classList.remove('is-selected');
  friendsModeButton.classList.remove('is-selected');
  roomCodeDisplay.textContent = '------';
  playerDisplay.textContent = '-';
  opponentDisplay.textContent = '-';
  themeDisplay.textContent = '-';
  statusMessage.textContent = '';
  startMessage.textContent = '';
  resultRoom.textContent = '-';
  resultTheme.textContent = '-';
  winnerMessage.textContent = t('fakeWinnerEmpty');
  ownResultImage.removeAttribute('src');
  opponentResultCard.hidden = false;
  opponentResultImage.removeAttribute('src');
  resetDrawingTools();

  clearCanvas(true);
  updateTimerDisplay();
  updateStartButtons();
  canvas.classList.add('is-locked');

  startScreen.hidden = false;
  waitingScreen.hidden = true;
  gameScreen.hidden = true;
  resultScreen.hidden = true;
  nicknameInput.focus();
}

function draw(event) {
  if (!isDrawing || isCanvasLocked) {
    return;
  }

  const position = getCanvasPosition(event);

  applyCurrentTool();
  context.lineTo(position.x, position.y);
  context.stroke();
}

function startDrawing(event) {
  if (isCanvasLocked) {
    return;
  }

  isDrawing = true;
  const position = getCanvasPosition(event);

  applyCurrentTool();
  context.beginPath();
  context.moveTo(position.x, position.y);
}

function stopDrawing() {
  if (!isDrawing) {
    return;
  }

  isDrawing = false;
  context.closePath();
}

function getCanvasPosition(event) {
  const canvasBounds = canvas.getBoundingClientRect();
  const scaleX = canvas.width / canvasBounds.width;
  const scaleY = canvas.height / canvasBounds.height;

  return {
    x: (event.clientX - canvasBounds.left) * scaleX,
    y: (event.clientY - canvasBounds.top) * scaleY,
  };
}

function getNickname() {
  return nicknameInput.value.trim();
}

function getRoomCode() {
  return roomCodeInput.value.trim().toUpperCase();
}

function updateGameInfo(opponentNickname) {
  currentOpponentNickname = opponentNickname;
  playerDisplay.textContent = currentPlayer;
  opponentDisplay.textContent = isSoloMode ? t('soloOpponent') : currentOpponentNickname;
  themeDisplay.textContent = translateTheme(currentTheme);
}

function updateTimerDisplay() {
  timerDisplay.textContent = `${timeRemaining}s`;
}

function updateStartButtons() {
  const hasNickname = getNickname() !== '';
  const hasRoomCode = getRoomCode() !== '';

  soloModeButton.disabled = !hasNickname;
  friendsModeButton.disabled = !hasNickname;
  createRoomButton.disabled = !hasNickname;
  joinRoomButton.disabled = !hasNickname || !hasRoomCode;
}

function setActionButtonsDisabled(isDisabled) {
  soloModeButton.disabled = isDisabled;
  friendsModeButton.disabled = isDisabled;
  createRoomButton.disabled = isDisabled;
  joinRoomButton.disabled = isDisabled;
}

function showStartMessage(message, isError) {
  startMessage.textContent = message;
  startMessage.classList.toggle('is-error', isError);
}

function t(key) {
  return TRANSLATIONS[currentLanguage][key] || TRANSLATIONS['pt-BR'][key] || key;
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
    element.alt = t(element.dataset.i18nAlt);
  });

  ptLanguageButton.classList.toggle('is-active', currentLanguage === 'pt-BR');
  enLanguageButton.classList.toggle('is-active', currentLanguage === 'en');

  if (currentPlayer || currentTheme || currentOpponentNickname) {
    updateGameInfo(currentOpponentNickname);
  }

  if (resultTheme.textContent !== '-') {
    resultTheme.textContent = translateTheme(currentTheme);
  }

  if (isSoloMode && !resultScreen.hidden) {
    winnerMessage.textContent = t('soloFinished');
  } else if (lastWinnerNickname) {
    winnerMessage.textContent = t('fakeWinner').replace('{name}', lastWinnerNickname);
  } else if (winnerMessage.textContent) {
    winnerMessage.textContent = t('fakeWinnerEmpty');
  }
}

function setLanguage(language) {
  currentLanguage = language;
  localStorage.setItem('drawDuelLanguage', language);
  applyLanguage();
}

function translateTheme(theme) {
  const themeKey = THEME_ALIASES[theme] || theme;
  const themeTranslation = THEME_TRANSLATIONS[themeKey];

  if (!themeTranslation) {
    return theme;
  }

  return themeTranslation[currentLanguage];
}

function applyCurrentTool() {
  context.strokeStyle = isEraserActive ? ERASER_COLOR : brushColor;
  context.lineWidth = brushSize;
  context.lineCap = 'round';
  context.lineJoin = 'round';
}

function updateBrushSize() {
  brushSize = Number(brushSizeInput.value);
  brushSizeDisplay.textContent = `${brushSize}px`;
}

function setDrawingMode(isEraser) {
  isEraserActive = isEraser;
  brushButton.classList.toggle('is-active', !isEraserActive);
  eraserButton.classList.toggle('is-active', isEraserActive);
  canvas.classList.toggle('is-erasing', isEraserActive);
}

function setToolControlsDisabled(isDisabled) {
  brushColorInput.disabled = isDisabled;
  brushSizeInput.disabled = isDisabled;
  brushButton.disabled = isDisabled;
  eraserButton.disabled = isDisabled;
}

function resetDrawingTools() {
  brushColor = DEFAULT_BRUSH_COLOR;
  brushSize = DEFAULT_BRUSH_SIZE;
  brushColorInput.value = DEFAULT_BRUSH_COLOR;
  brushSizeInput.value = String(DEFAULT_BRUSH_SIZE);
  updateBrushSize();
  setDrawingMode(false);
  setToolControlsDisabled(true);
}

function getRandomTheme() {
  const themeIndex = Math.floor(Math.random() * THEMES.length);
  return THEMES[themeIndex];
}

function toggleSettingsPanel() {
  const isOpen = settingsPanel.hidden;

  settingsPanel.hidden = !isOpen;
  settingsButton.setAttribute('aria-expanded', String(isOpen));
}

function handleMenuInputChange() {
  updateStartButtons();
  showStartMessage('', false);
}

nicknameInput.addEventListener('input', handleMenuInputChange);
nicknameInput.addEventListener('change', handleMenuInputChange);
nicknameInput.addEventListener('keyup', handleMenuInputChange);
nicknameInput.addEventListener('paste', () => {
  setTimeout(handleMenuInputChange, 0);
});
roomCodeInput.addEventListener('input', () => {
  roomCodeInput.value = getRoomCode();
  handleMenuInputChange();
});
roomCodeInput.addEventListener('change', handleMenuInputChange);
roomCodeInput.addEventListener('keyup', handleMenuInputChange);
roomCodeInput.addEventListener('paste', () => {
  setTimeout(() => {
    roomCodeInput.value = getRoomCode();
    handleMenuInputChange();
  }, 0);
});
settingsButton.addEventListener('click', toggleSettingsPanel);
ptLanguageButton.addEventListener('click', () => setLanguage('pt-BR'));
enLanguageButton.addEventListener('click', () => setLanguage('en'));
soloModeButton.addEventListener('click', handleSoloMode);
friendsModeButton.addEventListener('click', handleFriendsMode);
createRoomButton.addEventListener('click', handleCreateRoom);
joinRoomButton.addEventListener('click', handleJoinRoom);
backToMenuButton.addEventListener('click', resetGame);
brushColorInput.addEventListener('input', () => {
  brushColor = brushColorInput.value;
  setDrawingMode(false);
});
brushSizeInput.addEventListener('input', updateBrushSize);
brushButton.addEventListener('click', () => setDrawingMode(false));
eraserButton.addEventListener('click', () => setDrawingMode(true));
clearButton.addEventListener('click', () => clearCanvas());
resetButton.addEventListener('click', resetGame);
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

if (socket) {
  socket.on('room-created', ({ roomCode }) => {
    currentRoomCode = roomCode;
    roomCodeDisplay.textContent = roomCode;
    startScreen.hidden = true;
    waitingScreen.hidden = false;
    showStartMessage('', false);
  });

  socket.on('room-joined', ({ roomCode }) => {
    currentRoomCode = roomCode;
    showStartMessage(t('joiningRoom'), false);
  });

  socket.on('duel-started', startGame);
  socket.on('drawings-ready', showResult);

  socket.on('room-error', ({ messageKey, message }) => {
    const translatedMessage = messageKey ? t(messageKey) : message;

    showStartMessage(translatedMessage, true);
    statusMessage.textContent = translatedMessage;
    resetGame();
    showStartMessage(translatedMessage, true);
  });

  socket.on('connect_error', () => {
    showStartMessage(t('connectionFailed'), true);
    updateStartButtons();
  });
}

clearCanvas(true);
resetDrawingTools();
updateTimerDisplay();
updateStartButtons();
window.addEventListener('pageshow', updateStartButtons);

const savedLanguage = localStorage.getItem('drawDuelLanguage') || 'pt-BR';
setLanguage(savedLanguage);
