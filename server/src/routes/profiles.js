import express from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get current user's profile
router.get('/me', requireAuth, async (req, res) => {
  try {
    await db.read();
  } catch (err) {
    console.error('failed reading db in profiles/me', err);
    return res.json({ user: req.user, profile: null });
  }

  if (!db.data || !Array.isArray(db.data.profiles)) db.data = { ...db.data, profiles: [] };
  const profile = (db.data.profiles || []).find(p => p.userId == req.user.id) || null;
  res.json({ user: req.user, profile });
});

// Create/Update profile
router.post('/me', requireAuth, async (req, res) => {
  const payload = req.body || {};
  try { await db.read(); } catch(err){ console.error('failed reading db in profiles POST', err); return res.status(500).json({ error: 'db read failed' }); }
  if (!db.data || !Array.isArray(db.data.profiles)) db.data = { ...db.data, profiles: [] };
  const idx = db.data.profiles.findIndex(p => p.userId == req.user.id);
  if (idx === -1) {
    const profile = { id: ++db.data.lastId, userId: req.user.id, ...payload, updated_at: new Date().toISOString() };
    db.data.profiles.push(profile);
    await db.write();
    return res.status(201).json(profile);
  }
  db.data.profiles[idx] = { ...db.data.profiles[idx], ...payload, updated_at: new Date().toISOString() };
  await db.write();
  res.json(db.data.profiles[idx]);
});

// Admin: get any user's profile
router.get('/:userId', requireAuth, async (req, res) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
  try { await db.read(); } catch(err){ console.error('failed reading db in profiles GET by id', err); return res.status(500).json({ error: 'db read failed' }); }
  if (!db.data || !Array.isArray(db.data.profiles)) db.data = { ...db.data, profiles: [] };
  const profile = (db.data.profiles || []).find(p => String(p.userId) === String(req.params.userId)) || null;
  res.json(profile);
});

// Admin: update a user's profile
router.put('/:userId', requireAuth, async (req, res) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
  const payload = req.body || {};
  try { await db.read(); } catch(err){ console.error('failed reading db in profiles PUT', err); return res.status(500).json({ error: 'db read failed' }); }
  if (!db.data || !Array.isArray(db.data.profiles)) db.data = { ...db.data, profiles: [] };
  const idx = db.data.profiles.findIndex(p => String(p.userId) === String(req.params.userId));
  if (idx === -1) {
    const profile = { id: ++db.data.lastId, userId: req.params.userId, ...payload, updated_at: new Date().toISOString() };
    db.data.profiles.push(profile);
    await db.write();
    return res.status(201).json(profile);
  }
  db.data.profiles[idx] = { ...db.data.profiles[idx], ...payload, updated_at: new Date().toISOString() };
  await db.write();
  res.json(db.data.profiles[idx]);
});

export default router;
