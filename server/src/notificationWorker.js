import db from './db.js';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

async function sendEmail(to, subject, text, html) {
  try {
    const transporter = nodemailer.createTransport({ host: process.env.EMAIL_HOST, port: process.env.EMAIL_PORT || 587, auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });
    await transporter.sendMail({ from: process.env.DEFAULT_FROM_EMAIL, to, subject, text, html });
    return true;
  } catch (err) {
    console.log('notification worker: email send fallback', err.message);
    return false;
  }
}

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
      if (!res.ok) console.log('notification worker: twilio send failed', await res.text());
      return true;
    } catch (err) {
      console.log('notification worker: twilio error', err.message);
      return false;
    }
  }
  console.log('notification worker: SMS fallback to console', to, body);
  return false;
}

async function processNotifications() {
  await db.read();
  if (!db.data) db.data = {};
  if (!Array.isArray(db.data.notifications)) db.data.notifications = [];
  const now = new Date();
  const due = db.data.notifications.filter(n => n.status === 'queued' && new Date(n.sendAt) <= now);
  if (!due.length) return;
  for (const job of due) {
    try {
      job.attempts = (job.attempts || 0) + 1;
      job.lastAttempt = new Date().toISOString();
      let success = false;
      if (job.type === 'email') {
        success = await sendEmail(job.to, job.payload.subject || 'Notification', job.payload.text || '', job.payload.html || '');
      } else if (job.type === 'sms') {
        success = await sendSms(job.to, job.payload.text || '');
      } else if (job.type === 'reminder') {
        // default to email if looks like an email else sms
        if (String(job.to).includes('@')) success = await sendEmail(job.to, job.payload.subject || 'Reminder', job.payload.text || '', job.payload.html || '');
        else success = await sendSms(job.to, job.payload.text || 'Reminder');
      }
      job.status = success ? 'sent' : (job.attempts >= 3 ? 'failed' : 'queued');
      job.sent_at = success ? new Date().toISOString() : job.sent_at;
      await db.write();
    } catch (err) {
      console.log('notification worker: job error', err && err.message, 'job=', JSON.stringify(job));
      job.status = (job.attempts || 0) >= 3 ? 'failed' : 'queued';
      await db.write();
    }
  }
}

let intervalId = null;

export function startWorker(pollInterval = 30_000) {
  if (intervalId) return;
  intervalId = setInterval(() => {
    processNotifications().catch(err => console.error('notification worker error', err));
  }, pollInterval);
  // run immediately once
  processNotifications().catch(err => console.error('notification worker error', err));
  console.log('notification worker started, polling every', pollInterval, 'ms');
}

export function stopWorker() {
  if (!intervalId) return;
  clearInterval(intervalId);
  intervalId = null;
}

export default { startWorker, stopWorker };
