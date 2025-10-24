import express from 'express';
import db from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { getSignedUploadUrl } from '../s3helper.js';

const router = express.Router();

// Get signed upload url for resume
router.post('/upload-url', requireAuth, async (req, res) => {
  const { filename, contentType } = req.body;
  if (!filename) return res.status(400).json({ error: 'filename required' });
  const key = `resumes/${Date.now()}-${filename}`;
  if (process.env.STORAGE_PROVIDER === 's3' && process.env.S3_BUCKET) {
    const url = await getSignedUploadUrl(key, contentType||'application/pdf');
    await db.read(); db.data ||= { resumes: [], lastId: 0 };
    const id = ++db.data.lastId;
    const meta = { id, userId: req.user.id, key, url: `/s3/${key}`, created_at: new Date().toISOString() };
    db.data.resumes.push(meta);
    await db.write();
    return res.json({ uploadUrl: url, key, meta });
  }
  // fallback: instruct to upload to local uploads folder via existing documents upload endpoint
  res.json({ uploadUrl: null, note: 'Use /api/documents/upload fallback for local files' });
});

// Employer searches resumes
router.get('/search', requireAuth, requireRole(['admin','employer']), async (req, res) => {
  const q = req.query.q || '';
  await db.read(); db.data ||= { resumes: [] };
  const rows = db.data.resumes.filter(r => r.key.includes(q) || String(r.userId) === q);
  res.json(rows);
});

// Get signed download url for a resume (admin/employer)
router.get('/:id/download', requireAuth, requireRole(['admin','employer']), async (req, res) => {
  const id = req.params.id;
  await db.read(); db.data ||= { resumes: [] };
  const rec = db.data.resumes.find(r => String(r.id) === String(id));
  if (!rec) return res.status(404).json({ error: 'not found' });
  if (process.env.STORAGE_PROVIDER === 's3' && rec.key) {
    const { getSignedDownloadUrl } = await import('../s3helper.js');
    const url = await getSignedDownloadUrl(rec.key);
    return res.json({ url });
  }
  // fallback: if stored path points to local uploads, return path
  res.json({ path: rec.path || rec.url || null });
});

export default router;
