# Game Search Web App

A modern, responsive web application for searching games, featuring a premium design inspired by Eneba.

## Prerequisites
- Node.js (v14 or higher)

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the application (Backend + Frontend):
   ```bash
   npm start
   ```

3. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

## Backend API
The backend runs on `http://localhost:3000`.
- `GET /list`: List all games
- `GET /list?search=query`: Fuzzy search games by title

## Hosting Instructions (Free Tier)

### Frontend (Vercel / Netlify)
1. Push this repository to GitHub.
2. Connect your repository to Vercel or Netlify.
3. Set the build command to `npm run build` (in `frontend` folder) and publish directory to `dist`.
4. *Important*: You will need to update the `fetch` URL in `App.jsx` to point to your deployed backend URL instead of `localhost:3000`.

### Backend (Render / Railway / Glitch)
1. Push the `backend` folder or the whole repo to GitHub.
2. Deploy to Render.com (Web Service) or Railway.app.
   - **Render**: Connect repo, set root directory to `backend`, Build Command: `npm install`, Start Command: `node index.js`.
3. Note: The SQLite database files are ephemeral on most free tiers (will reset on redeploy/spin-down). For persistence, use a managed database (PostgreSQL/MySQL) or a volume (if supported). For this assignment, the seed script ensures data is always present on start.

### Solution for Assignment
This project is self-contained. The `npm start` command runs both the React frontend (Vite) and the Node.js/Express backend locally for evaluation.
