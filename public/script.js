const GAME_DURATION_SECONDS = 60;
const DEFAULT_BRUSH_COLOR = '#111827';
const DEFAULT_BRUSH_SIZE = 8;
const DEFAULT_BRUSH_OPACITY = 1;
const ERASER_COLOR = '#ffffff';
const MAX_HISTORY_STEPS = 20;
const BUCKET_FILL_TOLERANCE = 88;
const BUCKET_EDGE_TOLERANCE = 126;
const DEFAULT_DUEL_DURATION_SECONDS = 60;
const DEFAULT_CATEGORY_KEY = 'animals';
const THEME_CATEGORIES = {
  animals: {
    label: { 'pt-BR': 'Animais', en: 'Animals' },
    themes: [
      ['dog', 'Cachorro', 'Dog'],
      ['cat', 'Gato', 'Cat'],
      ['lion', 'Le\u00e3o', 'Lion'],
      ['tiger', 'Tigre', 'Tiger'],
      ['elephant', 'Elefante', 'Elephant'],
      ['giraffe', 'Girafa', 'Giraffe'],
      ['zebra', 'Zebra', 'Zebra'],
      ['monkey', 'Macaco', 'Monkey'],
      ['penguin', 'Pinguim', 'Penguin'],
      ['owl', 'Coruja', 'Owl'],
      ['eagle', '\u00c1guia', 'Eagle'],
      ['shark', 'Tubar\u00e3o', 'Shark'],
      ['dolphin', 'Golfinho', 'Dolphin'],
      ['octopus', 'Polvo', 'Octopus'],
      ['crab', 'Caranguejo', 'Crab'],
      ['turtle', 'Tartaruga', 'Turtle'],
      ['snake', 'Cobra', 'Snake'],
      ['chameleon', 'Camale\u00e3o', 'Chameleon'],
      ['rabbit', 'Coelho', 'Rabbit'],
      ['hamster', 'Hamster', 'Hamster'],
      ['horse', 'Cavalo', 'Horse'],
      ['cow', 'Vaca', 'Cow'],
      ['pig', 'Porco', 'Pig'],
      ['wolf', 'Lobo', 'Wolf'],
      ['fox', 'Raposa', 'Fox'],
      ['panda', 'Panda', 'Panda'],
      ['kangaroo', 'Canguru', 'Kangaroo'],
      ['rhino', 'Rinoceronte', 'Rhinoceros'],
      ['hippo', 'Hipop\u00f3tamo', 'Hippopotamus'],
      ['sloth', 'Pregui\u00e7a', 'Sloth'],
    ],
  },
  fantasy: {
    label: { 'pt-BR': 'Fantasia', en: 'Fantasy' },
    themes: [
      ['dragon', 'Drag\u00e3o', 'Dragon'],
      ['fairy', 'Fada', 'Fairy'],
      ['unicorn', 'Unic\u00f3rnio', 'Unicorn'],
      ['wizard', 'Mago', 'Wizard'],
      ['witch', 'Bruxa', 'Witch'],
      ['knight', 'Cavaleiro', 'Knight'],
      ['elf', 'Elfo', 'Elf'],
      ['dwarf', 'An\u00e3o', 'Dwarf'],
      ['orc', 'Orc', 'Orc'],
      ['goblin', 'Goblin', 'Goblin'],
      ['griffin', 'Grifo', 'Griffin'],
      ['phoenix', 'F\u00eanix', 'Phoenix'],
      ['mermaid', 'Sereia', 'Mermaid'],
      ['centaur', 'Centauro', 'Centaur'],
      ['giant', 'Gigante', 'Giant'],
      ['castle', 'Castelo', 'Castle'],
      ['magic-sword', 'Espada m\u00e1gica', 'Magic sword'],
      ['potion', 'Po\u00e7\u00e3o', 'Potion'],
      ['magic-crystal', 'Cristal m\u00e1gico', 'Magic crystal'],
      ['enchanted-book', 'Livro encantado', 'Enchanted book'],
      ['portal', 'Portal', 'Portal'],
      ['throne', 'Trono', 'Throne'],
      ['crown', 'Coroa', 'Crown'],
      ['treasure', 'Tesouro', 'Treasure'],
      ['spell', 'Feiti\u00e7o', 'Spell'],
      ['golem', 'Golem', 'Golem'],
      ['hydra', 'Hidra', 'Hydra'],
      ['ghost', 'Fantasma', 'Ghost'],
      ['necromancer', 'Necromante', 'Necromancer'],
      ['king', 'Rei', 'King'],
    ],
  },
  technology: {
    label: { 'pt-BR': 'Tecnologia', en: 'Technology' },
    themes: [
      ['computer', 'Computador', 'Computer'],
      ['laptop', 'Notebook', 'Laptop'],
      ['phone', 'Celular', 'Phone'],
      ['tablet', 'Tablet', 'Tablet'],
      ['robot', 'Rob\u00f4', 'Robot'],
      ['drone', 'Drone', 'Drone'],
      ['satellite', 'Sat\u00e9lite', 'Satellite'],
      ['rocket', 'Foguete', 'Rocket'],
      ['spaceship', 'Nave espacial', 'Spaceship'],
      ['game-controller', 'Controle de videogame', 'Game controller'],
      ['keyboard', 'Teclado', 'Keyboard'],
      ['mouse', 'Mouse', 'Mouse'],
      ['monitor', 'Monitor', 'Monitor'],
      ['headphones', 'Fone de ouvido', 'Headphones'],
      ['smartwatch', 'Smartwatch', 'Smartwatch'],
      ['printer', 'Impressora', 'Printer'],
      ['flash-drive', 'Pendrive', 'Flash drive'],
      ['server', 'Servidor', 'Server'],
      ['ai', 'Intelig\u00eancia Artificial', 'Artificial Intelligence'],
      ['chip', 'Chip', 'Chip'],
      ['usb-cable', 'Cabo USB', 'USB cable'],
      ['graphics-card', 'Placa de v\u00eddeo', 'Graphics card'],
      ['vr-glasses', '\u00d3culos VR', 'VR headset'],
      ['microphone', 'Microfone', 'Microphone'],
      ['camera', 'C\u00e2mera', 'Camera'],
      ['wifi', 'Wi-Fi', 'Wi-Fi'],
      ['data-center', 'Data Center', 'Data center'],
      ['android', 'Android', 'Android'],
      ['hologram', 'Holograma', 'Hologram'],
      ['exoskeleton', 'Exoesqueleto', 'Exoskeleton'],
    ],
  },
  chaotic: {
    label: { 'pt-BR': 'Ca\u00f3tico', en: 'Chaotic' },
    themes: [
      ['capybara-tank', 'Capivara pilotando um tanque', 'Capybara driving a tank'],
      ['cat-selling-course', 'Gato vendendo curso', 'Cat selling an online course'],
      ['dog-office-job', 'Cachorro trabalhando CLT', 'Dog working a corporate job'],
      ['frog-taxes', 'Sapo pagando imposto', 'Frog paying taxes'],
      ['shark-gym', 'Tubar\u00e3o na academia', 'Shark at the gym'],
      ['duck-streaming', 'Pato fazendo live', 'Duck livestreaming'],
      ['chicken-soccer', 'Galinha jogando futebol', 'Chicken playing soccer'],
      ['alligator-skate', 'Jacar\u00e9 andando de skate', 'Alligator skateboarding'],
      ['skeleton-bbq', 'Esqueleto no churrasco', 'Skeleton at a barbecue'],
      ['banana-suit', 'Banana de terno', 'Banana wearing a suit'],
      ['potato-president', 'Batata presidente', 'Potato president'],
      ['detective-pigeon', 'Pombo detetive', 'Detective pigeon'],
      ['alien-traffic', 'Alien\u00edgena no tr\u00e2nsito', 'Alien in traffic'],
      ['dinosaur-delivery', 'Dinossauro entregador', 'Delivery dinosaur'],
      ['horse-programmer', 'Cavalo programador', 'Programmer horse'],
      ['vampire-sunbathing', 'Vampiro tomando sol', 'Vampire sunbathing'],
      ['mummy-gym', 'M\u00famia fazendo academia', 'Mummy at the gym'],
      ['ghost-gaming', 'Fantasma jogando videogame', 'Ghost playing video games'],
      ['capybara-astronaut', 'Capivara astronauta', 'Capybara astronaut'],
      ['pirate-cat', 'Gato pirata', 'Pirate cat'],
      ['samurai-dog', 'Cachorro samurai', 'Samurai dog'],
      ['business-chicken', 'Frango empres\u00e1rio', 'Business chicken'],
      ['shark-waiter', 'Tubar\u00e3o gar\u00e7om', 'Shark waiter'],
      ['mafia-penguin', 'Pinguim mafioso', 'Mafia penguin'],
      ['octopus-dj', 'Polvo DJ', 'Octopus DJ'],
      ['crocodile-influencer', 'Crocodilo influencer', 'Crocodile influencer'],
      ['carrot-thief-rabbit', 'Coelho ladr\u00e3o de cenouras', 'Rabbit stealing carrots'],
      ['monkey-streamer', 'Macaco streamer', 'Monkey streamer'],
      ['teacher-owl', 'Coruja professora', 'Teacher owl'],
      ['trap-singer-wolf', 'Lobo cantor de trap', 'Wolf trap singer'],
    ],
  },
};

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
    category: 'Categoria de tema',
    drawTime: 'Tempo de desenho',
    duration60: '1 min',
    duration90: '1 min 30 seg',
    duration120: '2 min',
    duration300: '5 min',
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
    tools: 'Ferramentas',
    color: 'Cor',
    customColor: 'Cor personalizada',
    presetColors: 'Cores predefinidas',
    brushSizes: 'Tamanhos do pincel',
    brushOpacity: 'Opacidade do pincel',
    thickness: 'Espessura',
    size: 'Tamanho',
    transparency: 'Transpar\u00eancia',
    actions: 'A\u00e7\u00f5es',
    brush: 'Pincel',
    eraser: 'Borracha',
    bucket: 'Balde',
    undo: 'Desfazer',
    redo: 'Refazer',
    clear: 'Limpar',
    remainingTime: 'Tempo restante',
    canvasLabel: 'Canvas de desenho',
    clearDrawing: 'Limpar Desenho',
    leaveDuel: 'Sair do Duelo',
    resultScreenLabel: 'Resultado do duelo',
    result: 'Resultado',
    aiNotImplemented: 'IA ainda n\u00e3o implementada',
    aiJudgeResult: 'Resultado da IA',
    aiJudging: 'IA analisando seu desenho...',
    aiScore: 'Nota da IA',
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
    categoryChanged: 'Categoria atualizada. Clique em pronto novamente.',
    soloOpponent: 'Treino solo',
    preparing: 'Prepare-se...',
    timeEndedSending: 'Tempo encerrado! Enviando desenho...',
    soloFinished: 'Treino solo finalizado',
    winner: 'Vencedor: {name}',
    fakeWinner: 'Vencedor fake: {name}',
    fakeWinnerEmpty: 'Vencedor fake: -',
    connecting: 'Conectando ao servidor...',
    joiningRoom: 'Entrando na sala...',
    connectionFailed: 'N\u00e3o foi poss\u00edvel conectar ao servidor.',
    backToMenu: 'Voltar ao Menu',
    backToRoom: 'Voltar para a Sala',
    nicknameRequired: 'Digite um nickname.',
    roomNotFound: 'Sala n\u00e3o encontrada.',
    roomFullOrStarted: 'Sala cheia ou duelo j\u00e1 iniciado.',
    duelUnavailable: 'Duelo n\u00e3o encontrado ou j\u00e1 encerrado.',
    playerNotInRoom: 'Jogador n\u00e3o pertence a esta sala.',
    opponentLeft: 'O advers\u00e1rio saiu da sala. Crie ou entre em uma nova sala.',
    playersInRoomLabel: 'Jogadores na sala',
    readyButton: 'Pronto',
    readyWaitingOpponent: 'Aguardando outro jogador ficar pronto...',
    readyWaitingYou: 'Clique em pronto para iniciar o duelo.',
    waitingSecondPlayer: 'Aguardando outro jogador entrar...',
    waitingRoomReady: 'Os dois jogadores est\u00e3o na sala.',
    readyState: 'Pronto',
    notReadyState: 'Aguardando',
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
    category: 'Theme category',
    drawTime: 'Drawing time',
    duration60: '1 min',
    duration90: '1 min 30 sec',
    duration120: '2 min',
    duration300: '5 min',
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
    tools: 'Tools',
    color: 'Color',
    customColor: 'Custom color',
    presetColors: 'Preset colors',
    brushSizes: 'Brush sizes',
    brushOpacity: 'Brush opacity',
    thickness: 'Thickness',
    size: 'Size',
    transparency: 'Transparency',
    actions: 'Actions',
    brush: 'Brush',
    eraser: 'Eraser',
    bucket: 'Bucket',
    undo: 'Undo',
    redo: 'Redo',
    clear: 'Clear',
    remainingTime: 'Time remaining',
    canvasLabel: 'Drawing canvas',
    clearDrawing: 'Clear Drawing',
    leaveDuel: 'Leave Duel',
    resultScreenLabel: 'Duel result',
    result: 'Result',
    aiNotImplemented: 'AI not implemented yet',
    aiJudgeResult: 'AI result',
    aiJudging: 'AI is judging your drawing...',
    aiScore: 'AI score',
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
    categoryChanged: 'Category updated. Click ready again.',
    soloOpponent: 'Solo practice',
    preparing: 'Get ready...',
    timeEndedSending: 'Time is up! Sending drawing...',
    soloFinished: 'Solo practice finished',
    winner: 'Winner: {name}',
    fakeWinner: 'Fake winner: {name}',
    fakeWinnerEmpty: 'Fake winner: -',
    connecting: 'Connecting to server...',
    joiningRoom: 'Joining room...',
    connectionFailed: 'Could not connect to the server.',
    backToMenu: 'Back to Menu',
    backToRoom: 'Back to Room',
    nicknameRequired: 'Enter a nickname.',
    roomNotFound: 'Room not found.',
    roomFullOrStarted: 'Room is full or the duel has already started.',
    duelUnavailable: 'Duel not found or already finished.',
    playerNotInRoom: 'Player does not belong to this room.',
    opponentLeft: 'The opponent left the room. Create or join a new room.',
    playersInRoomLabel: 'Players in room',
    readyButton: 'Ready',
    readyWaitingOpponent: 'Waiting for the other player to get ready...',
    readyWaitingYou: 'Click ready to start the duel.',
    waitingSecondPlayer: 'Waiting for another player to join...',
    waitingRoomReady: 'Both players are in the room.',
    readyState: 'Ready',
    notReadyState: 'Waiting',
  },
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
const categorySelect = document.getElementById('categorySelect');
const waitingCategorySelect = document.getElementById('waitingCategorySelect');
const waitingDurationSelect = document.getElementById('waitingDurationSelect');
const soloModeButton = document.getElementById('soloModeButton');
const friendsModeButton = document.getElementById('friendsModeButton');
const privateRoomPanel = document.getElementById('privateRoomPanel');
const createRoomButton = document.getElementById('createRoomButton');
const joinRoomButton = document.getElementById('joinRoomButton');
const startMessage = document.getElementById('startMessage');
const roomCodeDisplay = document.getElementById('roomCodeDisplay');
const waitingRoomMessage = document.getElementById('waitingRoomMessage');
const waitingPlayersList = document.getElementById('waitingPlayersList');
const readyButton = document.getElementById('readyButton');
const readyStatusMessage = document.getElementById('readyStatusMessage');
const backToMenuButton = document.getElementById('backToMenuButton');
const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const playerDisplay = document.getElementById('playerDisplay');
const opponentDisplay = document.getElementById('opponentDisplay');
const themeDisplay = document.getElementById('themeDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const brushColorInput = document.getElementById('brushColorInput');
const brushSizeOptions = Array.from(document.querySelectorAll('.size-option'));
const brushOpacityOptions = Array.from(document.querySelectorAll('.opacity-option'));
const brushButton = document.getElementById('brushButton');
const eraserButton = document.getElementById('eraserButton');
const bucketButton = document.getElementById('bucketButton');
const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');
const bottomClearButton = document.getElementById('bottomClearButton');
const colorSwatches = Array.from(document.querySelectorAll('.color-swatch'));
const resetButton = document.getElementById('resetButton');
const statusMessage = document.getElementById('statusMessage');
const eraserCursor = document.getElementById('eraserCursor');
const resultRoomCard = document.getElementById('resultRoomCard');
const resultThemeCard = document.getElementById('resultThemeCard');
const player1ScoreCard = document.getElementById('player1ScoreCard');
const player2ScoreCard = document.getElementById('player2ScoreCard');
const resultRoom = document.getElementById('resultRoom');
const resultTheme = document.getElementById('resultTheme');
const winnerMessage = document.getElementById('winnerMessage');
const judgeReason = document.getElementById('judgeReason');
const player1ScoreLabel = document.getElementById('player1ScoreLabel');
const player2ScoreLabel = document.getElementById('player2ScoreLabel');
const player1ScoreDisplay = document.getElementById('player1ScoreDisplay');
const player2ScoreDisplay = document.getElementById('player2ScoreDisplay');
const ownResultImage = document.getElementById('ownResultImage');
const opponentResultCard = document.getElementById('opponentResultCard');
const opponentResultImage = document.getElementById('opponentResultImage');
const resultBackToMenuButton = document.getElementById('resultBackToMenuButton');

let currentPlayer = '';
let currentRoomCode = '';
let currentTheme = '';
let currentCategoryKey = DEFAULT_CATEGORY_KEY;
let currentDuelDurationSeconds = DEFAULT_DUEL_DURATION_SECONDS;
let currentOpponentNickname = '';
let isDrawing = false;
let lastDrawPosition = null;
let strokeBaseImageData = null;
let strokePoints = [];
let isCanvasLocked = true;
let hasSubmittedDrawing = false;
let timeRemaining = GAME_DURATION_SECONDS;
let timerId = null;
let gameStartTimeoutId = null;
let duelServerOffset = 0;
let brushColor = DEFAULT_BRUSH_COLOR;
let brushSize = DEFAULT_BRUSH_SIZE;
let brushOpacity = DEFAULT_BRUSH_OPACITY;
let currentTool = 'brush';
let isEraserActive = false;
let isSoloMode = false;
let currentLanguage = 'pt-BR';
let lastWinnerNickname = '';
let latestRoomPlayers = [];
let latestJudgeReasons = {
  reasonPt: '',
  reasonEn: '',
};
let undoStack = [];
let redoStack = [];
let areToolControlsDisabled = true;

function hexToRgba(hex, alpha = 1) {
  const normalizedHex = hex.replace('#', '');
  const bigint = parseInt(normalizedHex, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
    a: Math.round(alpha * 255),
  };
}

function handleSoloMode() {
  const nickname = getNickname();

  if (!nickname) {
    showStartMessage(t('soloNicknameRequired'), true);
    nicknameInput.focus();
    return;
  }

  currentPlayer = nickname;
  isSoloMode = true;
  currentCategoryKey = getSelectedCategoryKey();

  const startsAt = Date.now() + 600;

  startGame({
    roomCode: 'SOLO',
    categoryKey: currentCategoryKey,
    theme: getRandomTheme(currentCategoryKey),
    opponentNickname: t('soloOpponent'),
    durationSeconds: GAME_DURATION_SECONDS,
    serverNow: Date.now(),
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
  currentCategoryKey = getSelectedCategoryKey();
  connectSocket(() => {
    socket.emit('create-room', { nickname, categoryKey: currentCategoryKey });
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

function handleReadyClick() {
  if (!socket || !currentRoomCode) {
    return;
  }

  readyButton.disabled = true;
  socket.emit('player-ready');
}

function startGame(payload) {
  duelServerOffset = payload.serverNow ? payload.serverNow - Date.now() : 0;
  currentRoomCode = payload.roomCode;
  currentCategoryKey = payload.categoryKey || currentCategoryKey;
  currentDuelDurationSeconds = payload.durationSeconds || currentDuelDurationSeconds;
  currentTheme = payload.theme;
  currentOpponentNickname = payload.opponentNickname;
  latestRoomPlayers = [];
  timeRemaining = payload.durationSeconds;
  hasSubmittedDrawing = false;
  isDrawing = false;
  isCanvasLocked = true;

  clearTimeout(gameStartTimeoutId);
  clearCanvas(true);
  resetCanvasHistory();
  prepareCanvas();
  updateGameInfo(payload.opponentNickname);
  updateTimerDisplay();

  setSettingsVisible(false);
  startScreen.hidden = true;
  waitingScreen.hidden = true;
  resultScreen.hidden = true;
  gameScreen.hidden = false;
  bottomClearButton.disabled = true;
  setToolControlsDisabled(true);
  canvas.classList.add('is-locked');
  statusMessage.textContent = t('preparing');

  const delayUntilStart = Math.max(payload.startsAt - getSyncedNow(), 0);

  gameStartTimeoutId = setTimeout(() => {
    isCanvasLocked = false;
    bottomClearButton.disabled = false;
    setToolControlsDisabled(false);
    canvas.classList.remove('is-locked');
    statusMessage.textContent = '';
    startTimer(payload.endsAt);
  }, delayUntilStart);
}

function startTimer(endsAt) {
  clearInterval(timerId);

  updateRemainingTime(endsAt);

  timerId = setInterval(() => {
    updateRemainingTime(endsAt);

    if (timeRemaining <= 0) {
      endGame();
    }
  }, 250);
}

function updateRemainingTime(endsAt) {
  timeRemaining = Math.max(Math.ceil((endsAt - getSyncedNow()) / 1000), 0);
  updateTimerDisplay();
}

function getSyncedNow() {
  return Date.now() + duelServerOffset;
}

function endGame() {
  if (hasSubmittedDrawing) {
    return;
  }

  clearInterval(timerId);
  clearTimeout(gameStartTimeoutId);
  duelServerOffset = 0;
  isCanvasLocked = true;
  isDrawing = false;
  hasSubmittedDrawing = true;

  canvas.classList.add('is-locked');
  bottomClearButton.disabled = true;
  setToolControlsDisabled(true);
  statusMessage.textContent = t('timeEndedSending');
  submitDrawing();
}

async function submitDrawing() {
  if (isSoloMode) {
    const ownDrawing = {
      nickname: currentPlayer,
      drawingDataUrl: getCanvasImage(),
    };

    showResult({
      roomCode: 'SOLO',
      theme: currentTheme,
      winnerNickname: currentPlayer,
      ownDrawing,
      opponentDrawing: null,
    });

    await judgeSoloDrawing(ownDrawing.drawingDataUrl);
    return;
  }

  socket.emit('submit-drawing', {
    roomCode: currentRoomCode,
    nickname: currentPlayer,
    drawingDataUrl: getCanvasImage(),
    language: currentLanguage,
  });
}

async function judgeSoloDrawing(drawingDataUrl) {
  judgeReason.textContent = t('aiJudging');

  try {
    const response = await fetch('/api/judge-solo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        theme: translateTheme(currentTheme),
        playerName: currentPlayer,
        drawingDataUrl,
        language: currentLanguage,
      }),
    });

    if (!response.ok) {
      throw new Error('Solo judge request failed.');
    }

    const judgement = await response.json();

    latestJudgeReasons = {
      reasonPt: judgement.reasonPt || judgement.reason || '',
      reasonEn: judgement.reasonEn || judgement.reason || '',
    };
    player1ScoreDisplay.textContent = `${judgement.score}/10`;
    judgeReason.textContent = getLocalizedJudgeReason();
  } catch (error) {
    latestJudgeReasons = {
      reasonPt: 'N\u00e3o foi poss\u00edvel avaliar com IA agora, mas seu desenho foi enviado corretamente.',
      reasonEn: 'AI judging is unavailable right now, but your drawing was submitted correctly.',
    };
    player1ScoreDisplay.textContent = '-';
    judgeReason.textContent = getLocalizedJudgeReason();
  }
}

function showResult(payload) {
  clearInterval(timerId);
  clearTimeout(gameStartTimeoutId);

  resultRoomCard.hidden = true;
  resultThemeCard.hidden = false;
  player1ScoreCard.hidden = false;
  player2ScoreCard.hidden = true;
  resultRoom.textContent = payload.roomCode;
  resultTheme.textContent = translateTheme(payload.theme);
  lastWinnerNickname = payload.winnerNickname || '';
  winnerMessage.textContent = t('soloFinished');
  judgeReason.textContent = t('aiJudging');
  latestJudgeReasons = { reasonPt: '', reasonEn: '' };
  player1ScoreLabel.textContent = t('aiScore');
  player2ScoreLabel.textContent = '-';
  player1ScoreDisplay.textContent = '...';
  player2ScoreDisplay.textContent = '-';
  ownResultImage.src = payload.ownDrawing.drawingDataUrl;
  opponentResultCard.hidden = !payload.opponentDrawing;

  if (payload.opponentDrawing) {
    opponentResultImage.src = payload.opponentDrawing.drawingDataUrl;
  } else {
    opponentResultImage.removeAttribute('src');
  }

  gameScreen.hidden = true;
  resultScreen.hidden = false;
  setSettingsVisible(false);
  statusMessage.textContent = '';
  resultBackToMenuButton.textContent = t('backToMenu');
  resultBackToMenuButton.dataset.resultAction = 'menu';
}

function showDuelResult(payload) {
  clearInterval(timerId);
  clearTimeout(gameStartTimeoutId);

  const isPlayer1 = payload.player1Nickname === currentPlayer;
  const ownDrawing = isPlayer1 ? payload.player1Drawing : payload.player2Drawing;
  const opponentDrawing = isPlayer1 ? payload.player2Drawing : payload.player1Drawing;

  lastWinnerNickname = payload.winnerName || '';
  resultRoomCard.hidden = true;
  resultThemeCard.hidden = false;
  player1ScoreCard.hidden = false;
  player2ScoreCard.hidden = false;
  resultRoom.textContent = payload.roomCode;
  resultTheme.textContent = translateTheme(payload.theme);
  winnerMessage.textContent = t('winner').replace('{name}', payload.winnerName);
  latestJudgeReasons = {
    reasonPt: payload.reasonPt || payload.reason || '',
    reasonEn: payload.reasonEn || payload.reason || '',
  };
  judgeReason.textContent = getLocalizedJudgeReason();
  player1ScoreLabel.textContent = payload.player1Nickname;
  player2ScoreLabel.textContent = payload.player2Nickname;
  player1ScoreDisplay.textContent = `${payload.player1Score}/10`;
  player2ScoreDisplay.textContent = `${payload.player2Score}/10`;
  ownResultImage.src = ownDrawing.drawingDataUrl;
  opponentResultImage.src = opponentDrawing.drawingDataUrl;
  opponentResultCard.hidden = false;

  gameScreen.hidden = true;
  resultScreen.hidden = false;
  setSettingsVisible(false);
  statusMessage.textContent = '';
  resultBackToMenuButton.textContent = t('backToRoom');
  resultBackToMenuButton.dataset.resultAction = 'room';
}

function returnToRoomAfterResult() {
  if (isSoloMode || !socket || !currentRoomCode) {
    resetGame();
    return;
  }

  resultBackToMenuButton.disabled = true;
  socket.emit('return-to-room');
}

function clearCanvas(force = false) {
  if (!force && isCanvasLocked) {
    return;
  }

  if (!force) {
    saveCanvasState();
  }

  context.globalAlpha = 1;
  context.globalCompositeOperation = 'source-over';
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  applyCurrentTool();
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
  currentCategoryKey = DEFAULT_CATEGORY_KEY;
  currentOpponentNickname = '';
  isDrawing = false;
  lastDrawPosition = null;
  strokeBaseImageData = null;
  strokePoints = [];
  isCanvasLocked = true;
  hasSubmittedDrawing = false;
  timeRemaining = GAME_DURATION_SECONDS;
  currentDuelDurationSeconds = DEFAULT_DUEL_DURATION_SECONDS;
  isSoloMode = false;

  nicknameInput.value = '';
  roomCodeInput.value = '';
  categorySelect.value = currentCategoryKey;
  waitingCategorySelect.value = currentCategoryKey;
  waitingDurationSelect.value = String(currentDuelDurationSeconds);
  privateRoomPanel.hidden = true;
  soloModeButton.classList.remove('is-selected');
  friendsModeButton.classList.remove('is-selected');
  roomCodeDisplay.textContent = '------';
  waitingRoomMessage.textContent = t('waitingPlayer');
  waitingPlayersList.innerHTML = '';
  readyButton.disabled = true;
  readyStatusMessage.textContent = '';
  playerDisplay.textContent = '-';
  opponentDisplay.textContent = '-';
  themeDisplay.textContent = '-';
  statusMessage.textContent = '';
  startMessage.textContent = '';
  resultRoomCard.hidden = false;
  resultThemeCard.hidden = false;
  player1ScoreCard.hidden = false;
  player2ScoreCard.hidden = false;
  resultRoom.textContent = '-';
  resultTheme.textContent = '-';
  resultBackToMenuButton.disabled = false;
  resultBackToMenuButton.dataset.resultAction = '';
  resultBackToMenuButton.textContent = t('backToMenu');
  winnerMessage.textContent = t('fakeWinnerEmpty');
  judgeReason.textContent = '';
  latestJudgeReasons = { reasonPt: '', reasonEn: '' };
  player1ScoreLabel.textContent = 'Player 1';
  player2ScoreLabel.textContent = 'Player 2';
  player1ScoreDisplay.textContent = '-';
  player2ScoreDisplay.textContent = '-';
  ownResultImage.removeAttribute('src');
  opponentResultCard.hidden = false;
  opponentResultImage.removeAttribute('src');
  resetDrawingTools();

  clearCanvas(true);
  bottomClearButton.disabled = true;
  updateTimerDisplay();
  updateStartButtons();
  canvas.classList.add('is-locked');

  startScreen.hidden = false;
  waitingScreen.hidden = true;
  gameScreen.hidden = true;
  resultScreen.hidden = true;
  setSettingsVisible(true);
  nicknameInput.focus();
}

function draw(event) {
  updateEraserCursor(event);

  if (!isDrawing || isCanvasLocked || currentTool === 'bucket') {
    return;
  }

  event.preventDefault();
  const position = getCanvasPosition(event);

  strokePoints.push(position);
  renderCurrentStroke();
  lastDrawPosition = position;
}

function startDrawing(event) {
  if (isCanvasLocked) {
    return;
  }

  event.preventDefault();
  const position = getCanvasPosition(event);

  if (currentTool === 'bucket') {
    fillAreaAtPosition(position);
    return;
  }

  canvas.setPointerCapture?.(event.pointerId);
  isDrawing = true;

  saveCanvasState();
  strokeBaseImageData = context.getImageData(0, 0, canvas.width, canvas.height);
  strokePoints = [position];
  applyCurrentTool();
  lastDrawPosition = position;
  renderCurrentStroke();
}

function stopDrawing(event) {
  if (!isDrawing) {
    return;
  }

  if (event && event.pointerId !== undefined) {
    canvas.releasePointerCapture?.(event.pointerId);
  }

  isDrawing = false;
  lastDrawPosition = null;
  strokeBaseImageData = null;
  strokePoints = [];
  context.closePath();
}

function updateEraserCursor(event) {
  if (currentTool !== 'eraser' || isCanvasLocked) {
    hideEraserCursor();
    return;
  }

  const canvasBounds = canvas.getBoundingClientRect();
  const stageBounds = canvas.parentElement.getBoundingClientRect();
  const scale = canvasBounds.width / canvas.width;
  const cursorSize = Math.max(brushSize * scale, 8);

  eraserCursor.style.width = `${cursorSize}px`;
  eraserCursor.style.height = `${cursorSize}px`;
  eraserCursor.style.left = `${event.clientX - stageBounds.left}px`;
  eraserCursor.style.top = `${event.clientY - stageBounds.top}px`;
  eraserCursor.classList.add('is-visible');
}

function hideEraserCursor() {
  eraserCursor.classList.remove('is-visible');
}

function renderCurrentStroke() {
  if (!strokeBaseImageData || strokePoints.length === 0) {
    return;
  }

  context.globalAlpha = 1;
  context.globalCompositeOperation = 'source-over';
  context.putImageData(strokeBaseImageData, 0, 0);
  applyCurrentTool();
  context.beginPath();
  context.moveTo(strokePoints[0].x, strokePoints[0].y);

  if (strokePoints.length === 1) {
    context.lineTo(strokePoints[0].x + 0.01, strokePoints[0].y + 0.01);
  } else {
    strokePoints.slice(1).forEach((point) => {
      context.lineTo(point.x, point.y);
    });
  }

  context.stroke();
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
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  if (minutes > 0) {
    timerDisplay.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;
    return;
  }

  timerDisplay.textContent = `${seconds}s`;
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

function populateCategorySelects() {
  const categoryOptions = Object.entries(THEME_CATEGORIES).map(([categoryKey, category]) => (
    `<option value="${categoryKey}">${category.label[currentLanguage]}</option>`
  )).join('');

  categorySelect.innerHTML = categoryOptions;
  waitingCategorySelect.innerHTML = categoryOptions;
  categorySelect.value = currentCategoryKey;
  waitingCategorySelect.value = currentCategoryKey;
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  populateCategorySelects();

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
    player1ScoreLabel.textContent = t('aiScore');
  } else if (lastWinnerNickname) {
    winnerMessage.textContent = t('winner').replace('{name}', lastWinnerNickname);
  } else if (winnerMessage.textContent) {
    winnerMessage.textContent = t('fakeWinnerEmpty');
  }

  if (!resultScreen.hidden && resultBackToMenuButton.dataset.resultAction === 'room') {
    resultBackToMenuButton.textContent = t('backToRoom');
  }

  if (!resultScreen.hidden && (latestJudgeReasons.reasonPt || latestJudgeReasons.reasonEn)) {
    judgeReason.textContent = getLocalizedJudgeReason();
  }

  if (!waitingScreen.hidden && latestRoomPlayers.length > 0) {
    renderWaitingRoom(latestRoomPlayers);
  }
}

function setLanguage(language) {
  currentLanguage = language;
  localStorage.setItem('drawDuelLanguage', language);
  applyLanguage();
}

function translateTheme(theme) {
  const themeData = findTheme(theme);

  if (!themeData) {
    return theme;
  }

  return themeData[currentLanguage];
}

function translateCategory(categoryKey) {
  return THEME_CATEGORIES[categoryKey]?.label[currentLanguage] || categoryKey;
}

function findTheme(themeKey) {
  const allThemes = Object.values(THEME_CATEGORIES).flatMap((category) => category.themes);
  const themeData = allThemes.find(([key, ptLabel]) => key === themeKey || ptLabel === themeKey);

  if (!themeData) {
    return null;
  }

  return {
    key: themeData[0],
    'pt-BR': themeData[1],
    en: themeData[2],
  };
}

function getSelectedCategoryKey() {
  return categorySelect.value || DEFAULT_CATEGORY_KEY;
}

function getRandomTheme(categoryKey = DEFAULT_CATEGORY_KEY) {
  const themes = THEME_CATEGORIES[categoryKey]?.themes || THEME_CATEGORIES[DEFAULT_CATEGORY_KEY].themes;
  const themeIndex = Math.floor(Math.random() * themes.length);
  return themes[themeIndex][0];
}

function getLocalizedJudgeReason() {
  if (currentLanguage === 'en') {
    return latestJudgeReasons.reasonEn || latestJudgeReasons.reasonPt;
  }

  return latestJudgeReasons.reasonPt || latestJudgeReasons.reasonEn;
}

function applyCurrentTool() {
  context.globalAlpha = currentTool === 'eraser' ? 1 : brushOpacity;
  context.globalCompositeOperation = 'source-over';
  context.strokeStyle = currentTool === 'eraser' ? ERASER_COLOR : brushColor;
  context.lineWidth = brushSize;
  context.lineCap = 'round';
  context.lineJoin = 'round';
}

function updateBrushSize(size = brushSize) {
  brushSize = Number(size);
  brushSizeOptions.forEach((option) => {
    option.classList.toggle('is-active', Number(option.dataset.size) === brushSize);
  });
}

function updateBrushOpacity() {
  brushOpacityOptions.forEach((option) => {
    option.classList.toggle('is-active', Number(option.dataset.opacity) === Math.round(brushOpacity * 100));
  });
}

function setBrushOpacity(opacityValue) {
  brushOpacity = Number(opacityValue) / 100;
  updateBrushOpacity();
}

function setDrawingMode(isEraser) {
  setDrawingTool(isEraser ? 'eraser' : 'brush');
}

function setDrawingTool(tool) {
  currentTool = tool;
  isEraserActive = tool === 'eraser';
  brushButton.classList.toggle('is-active', tool === 'brush');
  eraserButton.classList.toggle('is-active', tool === 'eraser');
  bucketButton.classList.toggle('is-active', tool === 'bucket');
  canvas.classList.toggle('is-erasing', tool === 'eraser');

  if (tool !== 'eraser') {
    hideEraserCursor();
  }

  applyCurrentTool();
}

function setBrushColor(color) {
  const selectedTool = currentTool;

  brushColor = color;
  brushColorInput.value = color;
  colorSwatches.forEach((swatch) => {
    swatch.classList.toggle('is-active', swatch.dataset.color.toLowerCase() === color.toLowerCase());
  });

  if (selectedTool === 'bucket' || selectedTool === 'eraser') {
    setDrawingTool(selectedTool);
    return;
  }

  setDrawingTool('brush');
}

function fillAreaAtPosition(position) {
  if (isCanvasLocked) {
    return;
  }

  saveCanvasState();
  floodFill(Math.floor(position.x), Math.floor(position.y), hexToRgba(brushColor, brushOpacity));
  applyCurrentTool();
}

function floodFill(startX, startY, fillColor) {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = imageData;
  const originalData = new Uint8ClampedArray(data);
  const startIndex = (startY * width + startX) * 4;
  const targetColor = {
    r: data[startIndex],
    g: data[startIndex + 1],
    b: data[startIndex + 2],
    a: data[startIndex + 3],
  };
  const filledPixels = new Uint8Array(width * height);

  if (colorsAreClose(targetColor, fillColor, 0)) {
    return;
  }

  const pixelsToCheck = [[startX, startY]];

  while (pixelsToCheck.length > 0) {
    const [x, y] = pixelsToCheck.pop();

    if (x < 0 || x >= width || y < 0 || y >= height) {
      continue;
    }

    const pixelIndex = y * width + x;
    const index = pixelIndex * 4;

    if (filledPixels[pixelIndex]) {
      continue;
    }

    const currentColor = {
      r: originalData[index],
      g: originalData[index + 1],
      b: originalData[index + 2],
      a: originalData[index + 3],
    };

    if (!colorsAreClose(currentColor, targetColor, BUCKET_FILL_TOLERANCE)) {
      continue;
    }

    paintPixel(data, index, fillColor);
    filledPixels[pixelIndex] = 1;

    pixelsToCheck.push([x + 1, y]);
    pixelsToCheck.push([x - 1, y]);
    pixelsToCheck.push([x, y + 1]);
    pixelsToCheck.push([x, y - 1]);
  }

  softenBucketEdges(data, originalData, filledPixels, width, height, targetColor, fillColor);
  context.putImageData(imageData, 0, 0);
}

function softenBucketEdges(data, originalData, filledPixels, width, height, targetColor, fillColor) {
  const pixelsToSoften = [];

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const pixelIndex = y * width + x;

      if (filledPixels[pixelIndex] || !hasFilledNeighbor(filledPixels, width, pixelIndex)) {
        continue;
      }

      const index = pixelIndex * 4;
      const currentColor = {
        r: originalData[index],
        g: originalData[index + 1],
        b: originalData[index + 2],
        a: originalData[index + 3],
      };

      if (colorsAreClose(currentColor, targetColor, BUCKET_EDGE_TOLERANCE)) {
        pixelsToSoften.push(index);
      }
    }
  }

  pixelsToSoften.forEach((index) => paintPixel(data, index, fillColor));
}

function hasFilledNeighbor(filledPixels, width, pixelIndex) {
  return filledPixels[pixelIndex - 1]
    || filledPixels[pixelIndex + 1]
    || filledPixels[pixelIndex - width]
    || filledPixels[pixelIndex + width];
}

function paintPixel(data, index, fillColor) {
  data[index] = fillColor.r;
  data[index + 1] = fillColor.g;
  data[index + 2] = fillColor.b;
  data[index + 3] = fillColor.a;
}

function colorsAreClose(colorA, colorB, tolerance) {
  return Math.abs(colorA.r - colorB.r) <= tolerance
    && Math.abs(colorA.g - colorB.g) <= tolerance
    && Math.abs(colorA.b - colorB.b) <= tolerance
    && Math.abs(colorA.a - colorB.a) <= tolerance;
}

function saveCanvasState() {
  undoStack.push(context.getImageData(0, 0, canvas.width, canvas.height));

  if (undoStack.length > MAX_HISTORY_STEPS) {
    undoStack.shift();
  }

  redoStack = [];
  updateHistoryButtons();
}

function restoreCanvasState(imageData) {
  context.globalAlpha = 1;
  context.globalCompositeOperation = 'source-over';
  context.putImageData(imageData, 0, 0);
  applyCurrentTool();
}

function undoDrawing() {
  if (isCanvasLocked || undoStack.length === 0) {
    return;
  }

  redoStack.push(context.getImageData(0, 0, canvas.width, canvas.height));
  restoreCanvasState(undoStack.pop());
  updateHistoryButtons();
}

function redoDrawing() {
  if (isCanvasLocked || redoStack.length === 0) {
    return;
  }

  undoStack.push(context.getImageData(0, 0, canvas.width, canvas.height));
  restoreCanvasState(redoStack.pop());
  updateHistoryButtons();
}

function resetCanvasHistory() {
  undoStack = [];
  redoStack = [];
  updateHistoryButtons();
}

function updateHistoryButtons() {
  undoButton.disabled = areToolControlsDisabled || undoStack.length === 0;
  redoButton.disabled = areToolControlsDisabled || redoStack.length === 0;
}

function setToolControlsDisabled(isDisabled) {
  areToolControlsDisabled = isDisabled;
  brushColorInput.disabled = isDisabled;
  brushButton.disabled = isDisabled;
  eraserButton.disabled = isDisabled;
  bucketButton.disabled = isDisabled;
  colorSwatches.forEach((swatch) => {
    swatch.disabled = isDisabled;
  });
  brushSizeOptions.forEach((option) => {
    option.disabled = isDisabled;
  });
  brushOpacityOptions.forEach((option) => {
    option.disabled = isDisabled;
  });

  if (isDisabled) {
    hideEraserCursor();
  }

  updateHistoryButtons();
}

function resetDrawingTools() {
  brushColor = DEFAULT_BRUSH_COLOR;
  brushSize = DEFAULT_BRUSH_SIZE;
  brushOpacity = DEFAULT_BRUSH_OPACITY;
  currentTool = 'brush';
  brushColorInput.value = DEFAULT_BRUSH_COLOR;
  updateBrushSize(DEFAULT_BRUSH_SIZE);
  updateBrushOpacity();
  setBrushColor(DEFAULT_BRUSH_COLOR);
  resetCanvasHistory();
  setToolControlsDisabled(true);
}

function toggleSettingsPanel() {
  const isOpen = settingsPanel.hidden;

  settingsPanel.hidden = !isOpen;
  settingsButton.setAttribute('aria-expanded', String(isOpen));
}

function setSettingsVisible(isVisible) {
  settingsButton.hidden = !isVisible;

  if (!isVisible) {
    settingsPanel.hidden = true;
    settingsButton.setAttribute('aria-expanded', 'false');
  }
}

function handleRoomState(payload) {
  currentRoomCode = payload.roomCode;
  currentCategoryKey = payload.categoryKey || DEFAULT_CATEGORY_KEY;
  currentDuelDurationSeconds = payload.durationSeconds || DEFAULT_DUEL_DURATION_SECONDS;
  latestRoomPlayers = payload.players || [];

  setSettingsVisible(false);
  startScreen.hidden = true;
  waitingScreen.hidden = false;
  gameScreen.hidden = true;
  resultScreen.hidden = true;
  resultBackToMenuButton.disabled = false;
  resultBackToMenuButton.dataset.resultAction = '';
  roomCodeDisplay.textContent = payload.roomCode;
  waitingCategorySelect.value = currentCategoryKey;
  waitingDurationSelect.value = String(currentDuelDurationSeconds);
  renderWaitingRoom(latestRoomPlayers);
}

function renderWaitingRoom(players) {
  const ownPlayer = players.find((player) => player.nickname === currentPlayer);
  const hasTwoPlayers = players.length === 2;
  const isOwnPlayerReady = Boolean(ownPlayer && ownPlayer.ready);

  waitingPlayersList.innerHTML = players.map((player) => {
    const statusKey = player.ready ? 'readyState' : 'notReadyState';
    const statusClass = player.ready ? 'is-ready' : 'is-waiting';

    return `
      <div class="waiting-player">
        <strong>${escapeHtml(player.nickname)}</strong>
        <span class="${statusClass}">${t(statusKey)}</span>
      </div>
    `;
  }).join('');

  if (!hasTwoPlayers) {
    waitingRoomMessage.textContent = t('waitingSecondPlayer');
    readyButton.disabled = true;
    readyStatusMessage.textContent = t('waitingSecondPlayer');
    return;
  }

  waitingRoomMessage.textContent = t('waitingRoomReady');
  readyButton.disabled = isOwnPlayerReady;
  readyStatusMessage.textContent = isOwnPlayerReady
    ? t('readyWaitingOpponent')
    : t('readyWaitingYou');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function handleMenuInputChange() {
  updateStartButtons();
  showStartMessage('', false);
}

function handleCategoryChange() {
  currentCategoryKey = getSelectedCategoryKey();
}

function handleWaitingCategoryChange() {
  currentCategoryKey = waitingCategorySelect.value || DEFAULT_CATEGORY_KEY;

  if (socket && socket.connected && currentRoomCode) {
    socket.emit('update-room-category', { categoryKey: currentCategoryKey });
  }
}

function handleWaitingDurationChange() {
  currentDuelDurationSeconds = Number(waitingDurationSelect.value) || DEFAULT_DUEL_DURATION_SECONDS;

  if (socket && socket.connected && currentRoomCode) {
    socket.emit('update-room-duration', { durationSeconds: currentDuelDurationSeconds });
  }
}

function handleKeyboardShortcuts(event) {
  const activeTagName = document.activeElement?.tagName?.toLowerCase();
  const isTyping = activeTagName === 'input' || activeTagName === 'textarea';

  if (isTyping || !event.ctrlKey) {
    return;
  }

  const key = event.key.toLowerCase();

  if (key === 'z' && !event.shiftKey) {
    event.preventDefault();
    undoDrawing();
    return;
  }

  if (key === 'y' || (key === 'z' && event.shiftKey)) {
    event.preventDefault();
    redoDrawing();
  }
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
categorySelect.addEventListener('change', handleCategoryChange);
waitingCategorySelect.addEventListener('change', handleWaitingCategoryChange);
waitingDurationSelect.addEventListener('change', handleWaitingDurationChange);
settingsButton.addEventListener('click', toggleSettingsPanel);
ptLanguageButton.addEventListener('click', () => setLanguage('pt-BR'));
enLanguageButton.addEventListener('click', () => setLanguage('en'));
soloModeButton.addEventListener('click', handleSoloMode);
friendsModeButton.addEventListener('click', handleFriendsMode);
createRoomButton.addEventListener('click', handleCreateRoom);
joinRoomButton.addEventListener('click', handleJoinRoom);
readyButton.addEventListener('click', handleReadyClick);
backToMenuButton.addEventListener('click', resetGame);
resultBackToMenuButton.addEventListener('click', returnToRoomAfterResult);
brushColorInput.addEventListener('input', () => {
  setBrushColor(brushColorInput.value);
});
colorSwatches.forEach((swatch) => {
  swatch.addEventListener('click', () => setBrushColor(swatch.dataset.color));
});
brushSizeOptions.forEach((option) => {
  option.addEventListener('click', () => updateBrushSize(option.dataset.size));
});
brushOpacityOptions.forEach((option) => {
  option.addEventListener('click', () => setBrushOpacity(option.dataset.opacity));
});
brushButton.addEventListener('click', () => setDrawingMode(false));
eraserButton.addEventListener('click', () => setDrawingMode(true));
bucketButton.addEventListener('click', () => {
  setDrawingTool('bucket');
});
undoButton.addEventListener('click', undoDrawing);
redoButton.addEventListener('click', redoDrawing);
bottomClearButton.addEventListener('click', () => clearCanvas());
resetButton.addEventListener('click', resetGame);
canvas.addEventListener('pointerdown', startDrawing);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', stopDrawing);
canvas.addEventListener('pointercancel', stopDrawing);
canvas.addEventListener('pointerleave', stopDrawing);
canvas.addEventListener('pointerleave', hideEraserCursor);
document.addEventListener('keydown', handleKeyboardShortcuts);

if (socket) {
  socket.on('room-created', ({ roomCode }) => {
    currentRoomCode = roomCode;
    roomCodeDisplay.textContent = roomCode;
    setSettingsVisible(false);
    startScreen.hidden = true;
    waitingScreen.hidden = false;
    showStartMessage('', false);
  });

  socket.on('room-joined', ({ roomCode }) => {
    currentRoomCode = roomCode;
  });

  socket.on('room-state', handleRoomState);
  socket.on('duel-started', startGame);
  socket.on('duel-result', showDuelResult);

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
