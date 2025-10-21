# Project: The Trucking Vault (local run guide)

This repository contains a Vite + React frontend and an Express backend in `server/`.

Quick steps to run both locally (PowerShell):

1) Start backend (server)

```powershell
cd .\server
# install deps if not installed
npm install
# set env vars (or copy .env.example to .env and edit)
$env:JWT_SECRET = 'dev_secret'
$env:MYSQL_HOST = '' # leave empty to use local lowdb fallback
npm run dev
```

The backend listens on http://localhost:4000 by default.

2) Start frontend (client)

```powershell
cd ..\
npm install
npm run dev
```

Vite dev server runs on http://localhost:5173 by default and is configured to proxy any requests that start with `/api` to `http://localhost:4000` (see `vite.config.ts`). This means the frontend code can call `/api/auth/login` and it will be forwarded to the Express backend during development without CORS issues.

How the backend handles requests

- Routes are mounted under `/api/*` (for example `/api/auth/login`).
- The backend already uses the `cors` middleware which allows cross-origin requests. When running the frontend via Vite dev server you don't need to change server CORS settings because the proxy forwards requests.

Testing the login flow

- The frontend demo login form posts to `/api/auth/login` and expects a JSON token in the response. The backend returns a JWT token on successful login and `/api/auth/me` verifies it.
- Demo credentials are shown in the login page UI. If you are using the lowdb fallback (no MySQL env set), the repository includes a demo user created in the lowdb file. If you want to use MySQL, set the `MYSQL_*` env vars and ensure your database is reachable.

Next steps (optional):

- Add `dotenv` to the server to load a `.env` file automatically.
- Add a small seed script to create demo users when starting the server with an empty DB.
