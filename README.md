# Draw Duel

Draw Duel is a real-time drawing duel web app built with HTML, CSS, JavaScript, Node.js, Express, Socket.IO, and Google Gemini.

Players can practice alone or create private rooms to play with a friend. In multiplayer mode, both players join the same room, mark themselves as ready, receive the same drawing theme, and start a synchronized 60-second duel. At the end of the timer, both drawings are submitted and Gemini judges which drawing represents the theme better.

## Play Online

You can play Draw Duel here:

https://drawduel.onrender.com/

## Features

- Solo drawing mode
- Private multiplayer rooms with 6-character room codes
- Waiting room with ready checks before the duel starts
- Real-time room flow with Socket.IO
- Synchronized 60-second duel timer
- Random drawing themes
- Canvas drawing with mouse, touch, or stylus
- Brush color selector
- Brush size control
- Eraser tool
- Clear drawing button
- Result screen showing both drawings
- AI judging with Google Gemini
- Fallback random winner if Gemini fails
- Language selector with Portuguese Brazil and English
- Dark blue and purple game-style interface

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Socket.IO
- Google Gemini API

## Project Structure

```text
DrawDuel/
├── public/
│   ├── images/
│   │   └── logo_draw.png
│   ├── index.html
│   ├── style.css
│   └── script.js
├── services/
│   └── geminiJudge.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Optional:

```env
GEMINI_MODEL=gemini-2.5-flash
```

On Render, set these values in the service Environment Variables panel instead of committing `.env`.

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

### 3. Open the app locally

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
5. Both players enter a waiting room.
6. Both players must click Ready.
7. The server starts the duel when both players are ready.
8. Both players receive the same theme and a synchronized timer.
9. When time runs out, each canvas is converted with `canvas.toDataURL()`.
10. Drawings are sent to the server.
11. The server sends both drawings and the theme to Gemini.
12. Gemini returns the winner, scores, and a short reason.
13. Both players receive the final result.

## Current Limitations

- No database persistence
- No user accounts
- Rooms and drawings are stored temporarily in memory
- If Gemini fails, the server uses a random fallback winner

## Future Improvements

- Persistent match history
- Player profiles
- Spectator mode
- Better reconnect handling
- More drawing tools
- More game modes and theme categories

## License

This project is currently intended for study and portfolio purposes.
