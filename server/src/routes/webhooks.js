import express from 'express';
import db from '../db.js';
import { Buffer } from 'buffer';

const router = express.Router();

// Note: In production you should receive the raw body and verify with stripe.webhooks.constructEvent
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  if (secret && sig) {
    try {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      event = stripe.webhooks.constructEvent(req.body, sig, secret);
    } catch (err) {
      console.error('stripe webhook signature verification failed', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    try {
      event = JSON.parse(req.body.toString());
    } catch (err) {
      return res.status(400).send('invalid payload');
    }
  }

  // handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const amount = session.amount_total ? session.amount_total/100.0 : null;
    const currency = session.currency || null;
    const enrollmentId = session.metadata?.enrollmentId;
    const userId = session.metadata?.userId;
    await db.read(); db.data ||= { payments: [], enrollments: [], lastId: 0 };
    const id = ++db.data.lastId;
    const payment = { id, provider: 'stripe', provider_id: session.payment_intent || session.id, amount, currency, metadata: session.metadata, created_at: new Date().toISOString() };
    db.data.payments.push(payment);
    // mark enrollment paid if provided
    if (enrollmentId) {
      const e = db.data.enrollments.find(x=>String(x.id) === String(enrollmentId));
      if (e) { e.status = 'paid'; e.paid_at = new Date().toISOString(); }
    }
    await db.write();
    return res.json({ received: true });
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    await db.read(); db.data ||= { payments: [], lastId: 0 };
    const id = ++db.data.lastId;
    const payment = { id, provider: 'stripe', provider_id: pi.id, amount: (pi.amount_received||pi.amount)/100.0, currency: pi.currency, raw: pi, created_at: new Date().toISOString() };
    db.data.payments.push(payment);
    await db.write();
    return res.json({ received: true });
  }

  // invoice paid
  if (event.type === 'invoice.payment_succeeded') {
    const inv = event.data.object;
    await db.read(); db.data ||= { payments: [], invoices: [], subscriptions: [], lastId: 0 };
    const id = ++db.data.lastId;
    db.data.invoices.push({ id, provider: 'stripe', invoiceId: inv.id, amount: inv.amount_paid/100.0, currency: inv.currency, customer: inv.customer, created_at: new Date().toISOString(), raw: inv });
    // mark subscription active
    const subId = inv.subscription;
    if (subId) {
      const s = db.data.subscriptions.find(x=>x.subscriptionId===subId);
      if (s) s.status = 'active';
    }
    await db.write();
    return res.json({ received: true });
  }

  if (event.type === 'invoice.payment_failed') {
    const inv = event.data.object;
    await db.read(); db.data ||= { invoices: [], lastId: 0 };
    db.data.invoices.push({ id: ++db.data.lastId, provider: 'stripe', invoiceId: inv.id, amount: inv.amount_due/100.0, currency: inv.currency, customer: inv.customer, status: 'failed', created_at: new Date().toISOString(), raw: inv });
    await db.write();
    return res.json({ received: true });
  }

  // subscription lifecycle
  if (event.type.startsWith('customer.subscription')) {
    const sub = event.data.object;
    await db.read(); db.data ||= { subscriptions: [], lastId: 0 };
    let s = db.data.subscriptions.find(x=>x.subscriptionId===sub.id);
    if (!s) {
      s = { id: ++db.data.lastId, subscriptionId: sub.id, customer: sub.customer, status: sub.status, raw: sub, created_at: new Date().toISOString() };
      db.data.subscriptions.push(s);
    } else {
      s.status = sub.status; s.raw = sub; s.updated_at = new Date().toISOString();
    }
    await db.write();
    return res.json({ received: true });
  }

  res.json({ ok: true });
});

export default router;
