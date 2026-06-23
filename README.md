# Draw Duel

Draw Duel is a real-time drawing duel web app built with HTML, CSS, JavaScript, Node.js, Express, and Socket.IO.

Players can practice alone or create private rooms to play with a friend. When two players join the same room, both receive the same drawing theme and start a synchronized 60-second round. At the end of the timer, each drawing is submitted and both players can see the final results.

## Features

- Solo drawing mode
- Private multiplayer rooms with 6-character room codes
- Real-time room flow with Socket.IO
- Synchronized 60-second duel timer
- Random drawing themes
- Canvas drawing with mouse
- Brush color selector
- Brush size control
- Eraser tool
- Clear drawing button
- Result screen showing both drawings
- Fake random winner while AI judging is not implemented
- Language selector with Portuguese Brazil and English
- Minimal dark blue and purple game-style interface

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Socket.IO

## Project Structure

```text
DrawDuel/
├── public/
│   ├── images/
│   │   └── logo_draw.png
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

```bash
npm start
```

You can also use:

```bash
npm run dev
```

### 3. Open the app

Go to:

```text
http://localhost:3000
```

## Health Check

The backend exposes a simple health check route:

```http
GET /api/health
```

Response:

```json
{
  "status": "ok",
  "project": "Draw Duel"
}
```

## Multiplayer Flow

1. Player enters a nickname.
2. Player creates a private room.
3. The server generates a random 6-character room code.
4. Another player enters the same code to join.
5. When the room has 2 players, the server starts the duel.
6. Both players receive the same theme and a synchronized timer.
7. When time runs out, each canvas is converted with `canvas.toDataURL()`.
8. Drawings are sent to the server.
9. When both drawings are received, the server sends the result to both players.

## Current Limitations

- No real AI judging yet
- No database persistence
- No user accounts
- Rooms and drawings are stored temporarily in memory
- Best played with two browser windows or two devices on the same local server

## Future Improvements

- Real AI-based drawing evaluation
- Persistent match history
- Player profiles
- Spectator mode
- Better mobile drawing support
- More drawing tools
- Room cleanup and reconnect handling

## License

This project is currently intended for study and portfolio purposes.
