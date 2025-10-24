import jwt from 'jsonwebtoken';
import { findUserById } from '../userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_prod';

export async function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'missing token' });
  const token = auth.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await findUserById(decoded.id);
    if (!user) return res.status(401).json({ error: 'user not found' });
    req.user = { id: user.id, email: user.email, role: user.role || 'student' };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

export function requireRole(roles) {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'not authenticated' });
    if (!allowed.includes(req.user.role)) return res.status(403).json({ error: 'forbidden' });
    return next();
  };
}

export default { requireAuth, requireRole };
