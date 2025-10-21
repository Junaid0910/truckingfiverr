import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import authRouter from './routes/auth.js';
import programsRouter from './routes/programs.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/programs', programsRouter);

app.get('/api/health', (req, res) => res.json({ ok: true }));

// If a built frontend exists (dist), serve it as static files.
// This allows deploying frontend + backend in a single host/container.
try {
	const distPath = path.join(process.cwd(), 'dist');
	const indexHtml = path.join(distPath, 'index.html');
	if (fs.existsSync(indexHtml)) {
		app.use(express.static(distPath));
		// serve index.html for SPA routes
		app.get('*', (req, res) => res.sendFile(indexHtml));
	}
} catch (err) {
	// ignore; serving static is optional
}

const port = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
}

export default app;
