import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../userModel.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_prod';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const existing = await findUserByEmail(email);
  if (existing) return res.status(400).json({ error: 'user exists' });
  const hashed = bcrypt.hashSync(password, 10);
  try {
    const user = await createUser({ email, password: hashed });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (err) {
    console.error('register error', err);
    res.status(500).json({ error: 'server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const row = await findUserByEmail(email);
  if (!row) return res.status(400).json({ error: 'invalid credentials' });
  const ok = bcrypt.compareSync(password, row.password);
  if (!ok) return res.status(400).json({ error: 'invalid credentials' });
  const user = { id: row.id, email: row.email };
  const token = jwt.sign(user, JWT_SECRET);
  res.json({ user, token });
});

// verify token and return user info
router.get('/me', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'missing token' });
  const token = auth.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // decoded contains id and email
    const row = await findUserByEmail(decoded.email);
    if (!row) return res.status(404).json({ error: 'user not found' });
    res.json({ id: row.id, email: row.email, role: row.role || 'student' });
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
});

export default router;
