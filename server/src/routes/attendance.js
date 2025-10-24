import express from 'express';
import db from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Student marks attendance for a class/session
router.post('/checkin', requireAuth, async (req, res) => {
  const { programId } = req.body;
  if (!programId) return res.status(400).json({ error: 'programId required' });
  await db.read();
  db.data ||= { attendance: [], lastId: 0 };
  const id = ++db.data.lastId;
  const a = { id, userId: req.user.id, programId, time: new Date().toISOString() };
  db.data.attendance.push(a);
  await db.write();
  res.status(201).json(a);
});

// Admin or instructor can view attendance for a program
router.get('/program/:id', requireAuth, requireRole(['admin','instructor']), async (req, res) => {
  await db.read();
  db.data ||= { attendance: [] };
  const rows = db.data.attendance.filter(a => a.programId == req.params.id);
  res.json(rows);
});

// Instructor clock in
router.post('/clockin', requireAuth, requireRole('instructor'), async (req, res) => {
  const { note } = req.body;
  await db.read(); db.data ||= { payroll: [], lastId: 0 };
  const id = ++db.data.lastId;
  const entry = { id, instructorId: req.user.id, clockIn: new Date().toISOString(), clockOut: null, note: note||'', created_at: new Date().toISOString() };
  db.data.payroll.push(entry);
  await db.write();
  res.status(201).json(entry);
});

// Instructor clock out (updates last open payroll entry)
router.post('/clockout', requireAuth, requireRole('instructor'), async (req, res) => {
  await db.read(); db.data ||= { payroll: [] };
  const entries = db.data.payroll.filter(p=>p.instructorId==req.user.id && !p.clockOut);
  if (!entries || entries.length === 0) return res.status(400).json({ error: 'no open session' });
  const e = entries[entries.length-1];
  e.clockOut = new Date().toISOString();
  e.durationMinutes = Math.round((new Date(e.clockOut) - new Date(e.clockIn))/60000);
  await db.write();
  res.json(e);
});

export default router;
