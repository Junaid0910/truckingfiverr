import express from 'express';
import PDFDocument from 'pdfkit';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Generate a simple PDF certificate and return as base64 (for demo)
router.post('/generate/:courseId', requireAuth, async (req, res) => {
  const courseId = req.params.courseId;
  await db.read();
  if (!db.data) db.data = {};
  if (!Array.isArray(db.data.certificates)) db.data.certificates = [];
  if (typeof db.data.lastId !== 'number') db.data.lastId = 0;
  const id = ++db.data.lastId;
  const cert = { id, userId: req.user.id, courseId, issued_at: new Date().toISOString() };
  db.data.certificates.push(cert);
  await db.write();

  // create PDF in-memory
  const doc = new PDFDocument({ size: 'A4' });
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    res.json({ id: cert.id, pdf: pdfData.toString('base64') });
  });
  doc.fontSize(24).text('Certificate of Completion', { align: 'center' });
  doc.moveDown();
  doc.fontSize(16).text(`This certifies that ${req.user.email || 'Student'} completed course ${courseId}`, { align: 'center' });
  doc.end();
});

export default router;
