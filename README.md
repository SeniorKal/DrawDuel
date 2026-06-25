# Draw Duel

Draw Duel is a browser drawing game built with HTML, CSS, JavaScript, Node.js, Express, Socket.IO, and Google Gemini.

Players can draw alone in Solo Mode or create a private room to duel with a friend. Each match has a 60-second timer, a random theme from the selected category, drawing tools, and an AI result screen.

## Release

Current release: **1.0.0**

This is the first public release of Draw Duel.

## Play Online

Play here:

https://drawduel.onrender.com/

## Features

- Solo Mode
- Private multiplayer rooms with room codes
- Waiting room with ready checks
- Theme category selection
- Random theme inside the selected category
- Portuguese Brazil and English language support
- Synchronized 60-second multiplayer timer
- Drawing canvas with mouse, touch, or stylus
- Brush, eraser, and bucket tools
- Preset colors
- Preset brush sizes
- Preset transparency levels
- Undo and redo actions
- Clear drawing button
- AI judging with Google Gemini
- Solo AI score from 0 to 10
- Multiplayer AI winner, scores, and feedback

## Theme Categories

- Animals
- Fantasy
- Technology
- Chaotic

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
|-- public/
|   |-- images/
|   |-- index.html
|   |-- style.css
|   `-- script.js
|-- services/
|   `-- geminiJudge.js
|-- server.js
|-- package.json
|-- package-lock.json
`-- README.md
```

## Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Optional:

```env
GEMINI_MODEL=gemini-2.5-flash
OPENROUTER_MODEL=qwen/qwen2.5-vl-32b-instruct:free
GEMINI_MAX_ATTEMPTS=3
OPENROUTER_MAX_ATTEMPTS=2
```

On Render, add these values in the service environment variables panel. Do not commit your `.env` file.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

Or:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Health Check

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

1. Enter a nickname.
2. Choose a theme category.
3. Create a private room or join with a room code.
4. Wait until both players are in the room.
5. Both players click Ready.
6. The server picks a random theme from the selected category.
7. Both players draw for 60 seconds.
8. Drawings are submitted to the server.
9. Gemini judges the drawings.
10. Both players see the final result.

## Solo Flow

1. Enter a nickname.
2. Choose a theme category.
3. Start Solo Mode.
4. Draw for 60 seconds.
5. Gemini gives a score from 0 to 10 and short feedback.

## Current Limitations

- No database
- No user accounts
- Rooms are stored in memory
- Drawings are not saved permanently
- If Gemini fails, the app uses fallback results

## Future Ideas

- Match history
- Player profiles
- Better reconnect handling
- More game modes
- More theme categories
- Spectator mode

## License

This project is for study, portfolio, and learning purposes.
