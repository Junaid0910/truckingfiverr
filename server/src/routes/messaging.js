import express from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Send message to another user
router.post('/send', requireAuth, async (req, res) => {
  const { toUserId, subject, body } = req.body;
  if (!toUserId || !body) return res.status(400).json({ error: 'toUserId and body required' });
  await db.read();
  db.data ||= { messages: [], lastId: 0 };
  const id = ++db.data.lastId;
  const msg = { id, from: req.user.id, to: toUserId, subject: subject||'', body, created_at: new Date().toISOString() };
  db.data.messages.push(msg);
  await db.write();
  res.status(201).json(msg);
});

// Get inbox
router.get('/inbox', requireAuth, async (req, res) => {
  await db.read();
  db.data ||= { messages: [] };
  const rows = db.data.messages.filter(m => m.to == req.user.id);
  res.json(rows);
});

export default router;
