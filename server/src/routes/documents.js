import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import db from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { getSignedUploadUrl, uploadFile } from '../s3helper.js';

const router = express.Router();
const uploadDir = path.join(process.cwd(), 'server', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({ destination: uploadDir, filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`) });
const upload = multer({ storage });

// POST /upload - handles local uploads (multer) OR accepts metadata for S3 signed upload flow
router.post('/upload', requireAuth, upload.single('file'), async (req, res) => {
  // If STORAGE_PROVIDER is 's3' and client provided filename/contentType, return a signed url
  if (process.env.STORAGE_PROVIDER === 's3' && !req.file) {
    const { filename, contentType } = req.body;
    if (!filename) return res.status(400).json({ error: 'filename required for s3 uploads' });
    const key = `documents/${req.user.id}/${Date.now()}-${filename}`;
    const url = await getSignedUploadUrl(key, contentType||'application/octet-stream');
    // create a db record referencing the key
    await db.read(); db.data ||= { documents: [], lastId: 0 };
    const id = ++db.data.lastId;
    const doc = { id, userId: req.user.id, original: filename, key, path: `/s3/${key}`, storage: 's3', created_at: new Date().toISOString() };
    db.data.documents.push(doc);
    await db.write();
    return res.json({ uploadUrl: url, doc });
  }

  // Fallback: local multer upload
  if (!req.file) return res.status(400).json({ error: 'file required' });
  await db.read();
  db.data ||= { documents: [], lastId: 0 };
  const id = ++db.data.lastId;
  const doc = { id, userId: req.user.id, filename: req.file.filename, original: req.file.originalname, path: `/uploads/${req.file.filename}`, storage: 'local', created_at: new Date().toISOString() };
  db.data.documents.push(doc);
  await db.write();
  res.status(201).json(doc);
});

// GET /me - list user's documents
router.get('/me', requireAuth, async (req, res) => {
  await db.read(); db.data ||= { documents: [] };
  const rows = db.data.documents.filter(d => d.userId == req.user.id);
  res.json(rows);
});

// Admin: mark document verified and set expiry
router.post('/:id/verify', requireAuth, async (req, res) => {
  const { id } = req.params;
  await db.read(); db.data ||= { documents: [] };
  const doc = db.data.documents.find(d => String(d.id) === String(id));
  if (!doc) return res.status(404).json({ error: 'not found' });
  // only admins or instructors
  if (!req.user || !['admin','instructor'].includes(req.user.role)) return res.status(403).json({ error: 'forbidden' });
  doc.verified = true;
  if (req.body.expiresAt) doc.expires_at = req.body.expiresAt;
  await db.write();
  res.json(doc);
});

// Admin: list all documents
router.get('/', requireAuth, async (req, res) => {
  if (!req.user || !['admin','instructor'].includes(req.user.role)) return res.status(403).json({ error: 'forbidden' });
  await db.read(); db.data ||= { documents: [] };
  res.json(db.data.documents);
});

// Get download url for a document (owner or admin)
router.get('/:id/download', requireAuth, async (req, res) => {
  const id = req.params.id;
  await db.read(); db.data ||= { documents: [] };
  const doc = db.data.documents.find(d => String(d.id) === String(id));
  if (!doc) return res.status(404).json({ error: 'not found' });
  if (doc.userId != req.user.id && !(req.user && ['admin','instructor'].includes(req.user.role))) return res.status(403).json({ error: 'forbidden' });
  if (process.env.STORAGE_PROVIDER === 's3' && doc.key) {
    const { getSignedDownloadUrl } = await import('../s3helper.js');
    const url = await getSignedDownloadUrl(doc.key);
    return res.json({ url });
  }
  res.json({ path: doc.path });
});

export default router;
