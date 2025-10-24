import express from 'express';
import db from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// create product/price in Stripe
router.post('/product', requireAuth, requireRole('admin'), async (req, res) => {
  const { name, amount, currency = 'usd' } = req.body;
  if (!name || !amount) return res.status(400).json({ error: 'name and amount required' });
  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const product = await stripe.products.create({ name });
    const price = await stripe.prices.create({ unit_amount: Math.round(amount*100), currency, product: product.id });
    await db.read(); db.data ||= { stripeProducts: [], lastId: 0 };
    db.data.stripeProducts.push({ id: ++db.data.lastId, product: product.id, price: price.id, name, amount });
    await db.write();
    res.json({ product, price });
  } catch (err) {
    console.error('stripe product error', err);
    res.status(500).json({ error: 'stripe error' });
  }
});

// create subscription for user to a price (requires payment method attached in frontend)
router.post('/subscribe', requireAuth, async (req, res) => {
  const { priceId, customerEmail } = req.body;
  if (!priceId) return res.status(400).json({ error: 'priceId required' });
  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // create customer
    const customer = await stripe.customers.create({ email: customerEmail || undefined });
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer: customer.id,
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/subscription-success`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/subscription-cancel`
    });
    res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error('subscribe error', err);
    res.status(500).json({ error: 'stripe error' });
  }
});

// list invoices (admin can view all, user can view their own)
router.get('/invoices', requireAuth, async (req, res) => {
  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    if (req.user.role === 'admin') {
      const inv = await stripe.invoices.list({ limit: 20 });
      return res.json(inv.data);
    }
    // user's invoices by email if available
    const email = req.user.email;
    const customers = await stripe.customers.list({ email, limit: 1 });
    if (!customers.data.length) return res.json([]);
    const inv = await stripe.invoices.list({ customer: customers.data[0].id, limit: 20 });
    res.json(inv.data);
  } catch (err) {
    console.error('invoices error', err);
    res.status(500).json({ error: 'stripe error' });
  }
});

// refund a charge
router.post('/refund', requireAuth, requireRole('admin'), async (req, res) => {
  const { chargeId, amount } = req.body;
  if (!chargeId) return res.status(400).json({ error: 'chargeId required' });
  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const refund = await stripe.refunds.create({ charge: chargeId, amount: amount ? Math.round(amount*100) : undefined });
    res.json(refund);
  } catch (err) {
    console.error('refund error', err);
    res.status(500).json({ error: 'stripe error' });
  }
});

export default router;
