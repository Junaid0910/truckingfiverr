import express from 'express';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// create a payment intent / checkout session
router.post('/create', requireAuth, async (req, res) => {
  const { amount, currency = process.env.PAYMENTS_CURRENCY || 'usd', description } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: 'invalid amount' });

  // If Stripe configured, create a PaymentIntent
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey) {
    try {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe(stripeKey);
      const paymentIntent = await stripe.paymentIntents.create({ amount: Math.round(amount * 100), currency, description });
      return res.json({ provider: 'stripe', client_secret: paymentIntent.client_secret, id: paymentIntent.id });
    } catch (err) {
      console.error('stripe error', err);
      return res.status(500).json({ error: 'payments error' });
    }
  }

  // Fallback: record a local payment in lowdb
  await db.read();
  db.data ||= { payments: [], lastId: 0 };
  const id = ++db.data.lastId;
  const payment = { id, userId: req.user.id, amount, currency, description: description||'', provider: 'local', created_at: new Date().toISOString() };
  db.data.payments.push(payment);
  await db.write();
  res.json({ provider: 'local', payment });
});

// create a Stripe Checkout Session for an enrollment or arbitrary item
router.post('/checkout', requireAuth, async (req, res) => {
  const { enrollmentId, amount, currency = process.env.PAYMENTS_CURRENCY || 'usd', success_url, cancel_url } = req.body;
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) return res.status(400).json({ error: 'stripe not configured' });
  if (!amount || amount <= 0) return res.status(400).json({ error: 'invalid amount' });
  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: { currency, product_data: { name: enrollmentId ? `Enrollment ${enrollmentId}` : 'Payment' }, unit_amount: Math.round(amount * 100) },
        quantity: 1
      }],
      metadata: { enrollmentId: enrollmentId || '', userId: String(req.user.id) },
      success_url: success_url || `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-success`,
      cancel_url: cancel_url || `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-cancel`
    });
    res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('stripe checkout error', err);
    res.status(500).json({ error: 'stripe error' });
  }
});

// list current user's payments
router.get('/me', requireAuth, async (req, res) => {
  try {
    await db.read();
  } catch (err) {
    console.error('failed reading db in payments/me', err);
    // return safe empty list instead of crashing
    return res.json([]);
  }

  if (!db.data || !Array.isArray(db.data.payments)) {
    db.data = { payments: [] };
  }

  const rows = (db.data.payments || []).filter(p => p.userId == req.user.id);
  res.json(rows);
});

export default router;
