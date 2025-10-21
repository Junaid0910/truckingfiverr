import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  await db.read();
  const rows = [...db.data.programs].sort((a,b)=>b.id-a.id).map(({id,title,description,created_at})=>({id,title,description,created_at}));
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  await db.read();
  const id = ++db.data.lastId;
  const program = { id, title, description: description||'', created_at: new Date().toISOString() };
  db.data.programs.push(program);
  await db.write();
  res.status(201).json(program);
});

router.get('/:id', async (req, res) => {
  await db.read();
  const row = db.data.programs.find(p=>p.id==req.params.id);
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(row);
});

router.put('/:id', async (req, res) => {
  const { title, description } = req.body;
  await db.read();
  const idx = db.data.programs.findIndex(p=>p.id==req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  db.data.programs[idx].title = title;
  db.data.programs[idx].description = description||'';
  await db.write();
  res.json(db.data.programs[idx]);
});

router.delete('/:id', async (req, res) => {
  await db.read();
  db.data.programs = db.data.programs.filter(p=>p.id!=req.params.id);
  await db.write();
  res.status(204).end();
});

export default router;
