import express from 'express';
import db from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// list plans
router.get('/', async (req, res) => {
  await db.read(); db.data ||= { plans: [] };
  res.json(db.data.plans);
});

// admin create plan
router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  const { name, price, interval } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'name and price required' });
  await db.read(); db.data ||= { plans: [], lastId: 0 };
  const id = ++db.data.lastId;
  const plan = { id, name, price: Number(price), interval: interval||'one-time', created_at: new Date().toISOString() };
  db.data.plans.push(plan);
  await db.write();
  res.status(201).json(plan);
});

// purchase plan (creates checkout session)
router.post('/:id/purchase', requireAuth, async (req, res) => {
  const planId = req.params.id;
  await db.read(); db.data ||= { plans: [] };
  const plan = db.data.plans.find(p => p.id == planId);
  if (!plan) return res.status(404).json({ error: 'plan not found' });
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return res.status(400).json({ error: 'stripe not configured' });
  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{ price_data: { currency: process.env.PAYMENTS_CURRENCY || 'usd', product_data: { name: plan.name }, unit_amount: Math.round(plan.price * 100) }, quantity: 1 }],
      metadata: { planId: String(plan.id), userId: String(req.user.id) },
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-cancel`
    });
    res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('stripe purchase error', err);
    res.status(500).json({ error: 'stripe error' });
  }
});

export default router;
