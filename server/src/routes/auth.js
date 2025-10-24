import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../userModel.js';
import { findUserById, updateUserPassword } from '../userModel.js';
import crypto from 'crypto';
import db from '../db.js';
import nodemailer from 'nodemailer';
import cryptoRandomString from 'crypto-random-string';
import fetch from 'node-fetch';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_prod';

// helper to send email (nodemailer optional)
async function sendEmail(to, subject, text, html) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({ from: process.env.DEFAULT_FROM_EMAIL, to, subject, text, html });
    return true;
  } catch (err) {
    console.log('email send (fallback) - not configured or failed. Link:', text);
    return false;
  }
}

// helper to send SMS via Twilio if configured (otherwise log)
async function sendSms(to, body) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE;
  if (accountSid && authToken && from) {
    try {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const params = new URLSearchParams();
      params.append('From', from);
      params.append('To', to);
      params.append('Body', body);
      const res = await fetch(url, { method: 'POST', body: params, headers: { Authorization: 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64') } });
      if (!res.ok) console.log('twilio send failed', await res.text());
      return true;
    } catch (err) {
      console.log('twilio send error', err.message);
      return false;
    }
  }
  console.log('SMS fallback to console for', to, body);
  return false;
}

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

// request email verification / send verification link
router.post('/request-verify', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ error: 'not found' });
  const token = crypto.randomBytes(24).toString('hex');
  await db.read(); db.data ||= { verifications: [], lastId: 0 };
  db.data.verifications = db.data.verifications || [];
  db.data.verifications.push({ token, userId: user.id, created_at: new Date().toISOString() });
  await db.write();
  const link = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${token}`;
  await sendEmail(email, 'Verify your email', link, `<a href="${link}">Verify email</a>`);
  res.json({ ok: true });
});

// verify email token
router.post('/verify-email', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'token required' });
  await db.read(); db.data ||= { verifications: [] };
  const v = db.data.verifications.find(x => x.token === token);
  if (!v) return res.status(400).json({ error: 'invalid token' });
  // mark user as verified
  await db.read(); db.data ||= { users: [] };
  const u = db.data.users.find(x => x.id == v.userId);
  if (u) { u.email_verified = true; await db.write(); }
  res.json({ ok: true });
});

// request password reset
router.post('/request-password-reset', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ error: 'not found' });
  const token = crypto.randomBytes(24).toString('hex');
  await db.read(); db.data ||= { resets: [], lastId: 0 };
  db.data.resets.push({ token, userId: user.id, created_at: new Date().toISOString() });
  await db.write();
  const link = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
  await sendEmail(email, 'Password reset', link, `<a href="${link}">Reset password</a>`);
  res.json({ ok: true });
});

// request OTP for phone login/verification
router.post('/request-otp', async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'phone required' });
  const otp = cryptoRandomString({ length: 6, type: 'numeric' });
  await db.read(); db.data ||= { otps: [], lastId: 0 };
  db.data.otps.push({ phone, otp, created_at: new Date().toISOString() });
  await db.write();
  await sendSms(phone, `Your verification code is ${otp}`);
  res.json({ ok: true });
});

// verify OTP and sign in or create user by phone
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ error: 'phone and otp required' });
  await db.read(); db.data ||= { otps: [], users: [], lastId: 0 };
  const rec = db.data.otps.reverse().find(o => o.phone === phone && o.otp === otp);
  if (!rec) return res.status(400).json({ error: 'invalid otp' });
  // find user by phone
  let user = db.data.users.find(u => u.phone === phone);
  if (!user) {
    const id = ++db.data.lastId;
    user = { id, phone, role: 'student', created_at: new Date().toISOString() };
    db.data.users.push(user);
    await db.write();
  }
  const token = jwt.sign({ id: user.id, phone: user.phone }, JWT_SECRET);
  res.json({ user: { id: user.id, phone: user.phone }, token });
});

// finalize password reset
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ error: 'token and password required' });
  await db.read(); db.data ||= { resets: [] };
  const r = db.data.resets.find(x => x.token === token);
  if (!r) return res.status(400).json({ error: 'invalid token' });
  const hashed = bcrypt.hashSync(password, 10);
  // update password either in MySQL or lowdb
  try {
    await updateUserPassword(r.userId, hashed);
  } catch (err) {
    // fallback to lowdb
    await db.read(); db.data ||= { users: [] };
    const u = db.data.users.find(x=>x.id==r.userId);
    if (u) { u.password = hashed; await db.write(); }
  }
  res.json({ ok: true });
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
