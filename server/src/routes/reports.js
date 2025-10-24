import express from 'express';
import db from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// revenue summary (admin)
router.get('/revenue', requireAuth, requireRole('admin'), async (req, res) => {
  await db.read(); db.data ||= { payments: [] };
  const total = db.data.payments.reduce((s,p)=>s+ (p.amount||0), 0);
  res.json({ total, count: db.data.payments.length });
});

// enrollment counts per program
router.get('/enrollments', requireAuth, requireRole('admin'), async (req, res) => {
  await db.read(); db.data ||= { enrollments: [], programs: [] };
  const counts = db.data.programs.map(p=> ({ programId: p.id, title: p.title, count: db.data.enrollments.filter(e=>e.programId==p.id).length }));
  res.json(counts);
});

// notifications scheduler: create a notification job
router.post('/notifications', requireAuth, requireRole('admin'), async (req, res) => {
  const { type, target, when, payload } = req.body;
  if (!type || !when) return res.status(400).json({ error: 'type and when required' });
  await db.read(); db.data ||= { notifications: [], lastId: 0 };
  const id = ++db.data.lastId;
  const job = { id, type, target: target||null, when, payload: payload||{}, status: 'scheduled', created_at: new Date().toISOString() };
  db.data.notifications.push(job);
  await db.write();
  res.status(201).json(job);
});

router.get('/notifications', requireAuth, requireRole('admin'), async (req, res) => {
  await db.read(); db.data ||= { notifications: [] };
  res.json(db.data.notifications);
});

export default router;
