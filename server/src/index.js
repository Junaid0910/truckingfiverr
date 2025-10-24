import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import authRouter from './routes/auth.js';
import programsRouter from './routes/programs.js';
import profilesRouter from './routes/profiles.js';
import enrollmentsRouter from './routes/enrollments.js';
import paymentsRouter from './routes/payments.js';
import documentsRouter from './routes/documents.js';
import attendanceRouter from './routes/attendance.js';
import jobsRouter from './routes/jobs.js';
import messagingRouter from './routes/messaging.js';
import ticketsRouter from './routes/tickets.js';
import webhooksRouter from './routes/webhooks.js';
import lmsRouter from './routes/lms.js';
import plansRouter from './routes/plans.js';
import billingRouter from './routes/billing.js';
import certificatesRouter from './routes/certificates.js';
import resumesRouter from './routes/resumes.js';
import subscriptionsRouter from './routes/subscriptions.js';
import reportsRouter from './routes/reports.js';
import notificationsRouter from './routes/notifications.js';
import notificationWorker from './notificationWorker.js';

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || '*';
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/programs', programsRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/enrollments', enrollmentsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/messages', messagingRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/api/webhooks', webhooksRouter);
app.use('/api/lms', lmsRouter);
app.use('/api/plans', plansRouter);
app.use('/api/billing', billingRouter);
app.use('/api/certificates', certificatesRouter);
app.use('/api/resumes', resumesRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/notifications', notificationsRouter);

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
		// start background workers (notifications)
		try {
			notificationWorker.startWorker(Number(process.env.NOTIFY_POLL_MS) || 30_000);
		} catch (err) {
			console.error('failed to start notification worker', err);
		}
}

export default app;
