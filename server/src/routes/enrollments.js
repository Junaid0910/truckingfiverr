import express from 'express';
import db from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// List enrollments (admin only)
router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  await db.read();
  db.data ||= { enrollments: [] };
  res.json(db.data.enrollments || []);
});

// Student enrolls in a program
router.post('/', requireAuth, async (req, res) => {
  const { programId, price } = req.body;
  if (!programId) return res.status(400).json({ error: 'programId required' });
  await db.read();
  db.data ||= { users: [], programs: [], enrollments: [], lastId: 0 };
  const program = db.data.programs.find(p => p.id == programId);
  if (!program) return res.status(404).json({ error: 'program not found' });
  const id = ++db.data.lastId;
  const enrollment = { id, userId: req.user.id, programId: program.id, status: 'enrolled', created_at: new Date().toISOString() };
  db.data.enrollments.push(enrollment);
  await db.write();
  // If price provided and Stripe configured, create checkout session and return URL
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (price && stripeKey) {
    try {
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe(stripeKey);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{ price_data: { currency: process.env.PAYMENTS_CURRENCY || 'usd', product_data: { name: `Enrollment ${enrollment.id}` }, unit_amount: Math.round(price * 100) }, quantity: 1 }],
        metadata: { enrollmentId: String(enrollment.id), userId: String(req.user.id) },
        success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-success`,
        cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-cancel`
      });
      return res.status(201).json({ enrollment, checkout: { url: session.url, id: session.id } });
    } catch (err) {
      console.error('stripe checkout', err);
    }
  }
  res.status(201).json(enrollment);
});

// Get a student's enrollments
router.get('/me', requireAuth, async (req, res) => {
  try {
    await db.read();
  } catch (err) {
    console.error('failed reading db in enrollments/me', err);
    return res.json([]);
  }

  if (!db.data || !Array.isArray(db.data.enrollments)) db.data = { ...db.data, enrollments: [] };
  const rows = (db.data.enrollments || []).filter(e => e.userId == req.user.id);
  res.json(rows);
});

// Admin: update enrollment status (approve/deny/waitlist)
router.post('/:id/status', requireAuth, requireRole('admin'), async (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'status required' });
  await db.read(); db.data ||= { enrollments: [], lastId: 0 };
  const e = db.data.enrollments.find(x => String(x.id) === String(req.params.id));
  if (!e) return res.status(404).json({ error: 'not found' });
  e.status = status;
  e.status_updated_at = new Date().toISOString();
  await db.write();
  // optional notification: create a notification job
  db.data.notifications = db.data.notifications || [];
  const nid = ++db.data.lastId;
  db.data.notifications.push({ id: nid, type: 'email', to: e.userEmail || null, payload: { subject: 'Enrollment update', text: `Your enrollment #${e.id} status changed to ${status}` }, sendAt: new Date().toISOString(), status: 'queued', created_at: new Date().toISOString() });
  await db.write();
  res.json(e);
});

export default router;
