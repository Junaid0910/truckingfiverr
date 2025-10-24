import express from 'express';
import db from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Employers (or admins) can post jobs
router.post('/', requireAuth, requireRole(['admin','employer']), async (req, res) => {
  const { title, description, location, url } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  await db.read();
  db.data ||= { jobs: [], lastId: 0 };
  const id = ++db.data.lastId;
  const job = { id, posterId: req.user.id, title, description, location: location||'', url: url||'', created_at: new Date().toISOString() };
  db.data.jobs.push(job);
  await db.write();
  res.status(201).json(job);
});

// Public job listings (students and guests can view)
router.get('/', async (req, res) => {
  await db.read();
  db.data ||= { jobs: [] };
  res.json(db.data.jobs || []);
});

// Student applies to a job
router.post('/:id/apply', requireAuth, async (req, res) => {
  const jobId = req.params.id;
  await db.read();
  db.data ||= { applications: [], lastId: 0 };
  const job = db.data.jobs.find(j=>j.id==jobId);
  if (!job) return res.status(404).json({ error: 'job not found' });
  const id = ++db.data.lastId;
  const app = { id, jobId: job.id, userId: req.user.id, status: 'applied', created_at: new Date().toISOString() };
  db.data.applications.push(app);
  await db.write();
  res.status(201).json(app);
});

export default router;
