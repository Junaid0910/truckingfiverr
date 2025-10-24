import express from 'express';
import db from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Enqueue a notification job
router.post('/enqueue', requireAuth, requireRole(['admin','instructor']), async (req, res) => {
  const { type, to, payload, sendAt } = req.body;
  if (!type || !to) return res.status(400).json({ error: 'type and to required' });
  await db.read(); db.data ||= { notifications: [], lastId: 0 };
  const id = ++db.data.lastId;
  const job = { id, type, to, payload: payload||{}, sendAt: sendAt || new Date().toISOString(), status: 'queued', created_at: new Date().toISOString() };
  db.data.notifications.push(job);
  await db.write();
  res.status(201).json(job);
});

// list pending notifications (admin/instructor)
router.get('/pending', requireAuth, requireRole(['admin','instructor']), async (req, res) => {
  await db.read(); db.data ||= { notifications: [] };
  const rows = db.data.notifications.filter(n => n.status === 'queued');
  res.json(rows);
});

// trigger worker run on-demand (admin only)
router.post('/run', requireAuth, requireRole('admin'), async (req, res) => {
  // set a flag so worker will process on next tick; simple: update a timestamp
  await db.read(); db.data ||= { meta: {} };
  db.data.meta.lastManualRun = new Date().toISOString();
  await db.write();
  res.json({ ok: true });
});

export default router;
