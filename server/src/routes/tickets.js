import express from 'express';
import db from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Student creates a ticket
router.post('/', requireAuth, async (req, res) => {
  const { subject, body } = req.body;
  if (!subject || !body) return res.status(400).json({ error: 'subject and body required' });
  await db.read();
  db.data ||= { tickets: [], lastId: 0 };
  const id = ++db.data.lastId;
  const ticket = { id, userId: req.user.id, subject, body, status: 'open', created_at: new Date().toISOString() };
  db.data.tickets.push(ticket);
  await db.write();
  res.status(201).json(ticket);
});

// Admin lists tickets
router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  await db.read();
  db.data ||= { tickets: [] };
  res.json(db.data.tickets || []);
});

// Admin resolve a ticket
router.post('/:id/resolve', requireAuth, requireRole('admin'), async (req, res) => {
  await db.read();
  db.data ||= { tickets: [] };
  const idx = db.data.tickets.findIndex(t=>t.id==req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'ticket not found' });
  db.data.tickets[idx].status = 'resolved';
  db.data.tickets[idx].resolved_at = new Date().toISOString();
  await db.write();
  res.json(db.data.tickets[idx]);
});

export default router;
