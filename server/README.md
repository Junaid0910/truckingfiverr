# Server

Simple Express + SQLite backend for local development.

Run:

```powershell
cd server
npm install
npm run dev
```

API:
- GET /api/health
- POST /api/auth/register { email, password }
- POST /api/auth/login { email, password }
- GET /api/programs
- POST /api/programs { title, description }
