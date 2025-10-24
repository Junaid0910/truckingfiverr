import express from 'express';
import db from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// list subscriptions (admin sees all)
router.get('/', requireAuth, async (req, res) => {
  await db.read(); db.data ||= { subscriptions: [] };
  if (req.user.role === 'admin') return res.json(db.data.subscriptions);
  res.json(db.data.subscriptions.filter(s=>s.customer===req.user.email || s.customer==req.user.id));
});

// cancel subscription
router.post('/:subscriptionId/cancel', requireAuth, requireRole('admin'), async (req, res) => {
  const subscriptionId = req.params.subscriptionId;
  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const cancelled = await stripe.subscriptions.del(subscriptionId);
    await db.read(); db.data ||= { subscriptions: [] };
    const s = db.data.subscriptions.find(x=>x.subscriptionId===subscriptionId);
    if (s) { s.status = 'canceled'; s.updated_at = new Date().toISOString(); await db.write(); }
    res.json(cancelled);
  } catch (err) {
    console.error('cancel subscription', err);
    res.status(500).json({ error: 'stripe error' });
  }
});

export default router;
