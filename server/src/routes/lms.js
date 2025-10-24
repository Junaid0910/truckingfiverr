import express from 'express';
import db from '../db.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// List all courses
router.get('/courses', async (req, res) => {
  await db.read(); db.data ||= { courses: [] };
  res.json(db.data.courses);
});

// Get single course by id
router.get('/courses/:courseId', async (req, res) => {
  await db.read();
  // Ensure courses array exists
  if (!db.data) db.data = {};
  if (!Array.isArray(db.data.courses)) db.data.courses = [];
  const course = (db.data.courses || []).find(c => String(c.id) === String(req.params.courseId));
  if (!course) return res.status(404).json({ error: 'course not found' });
  res.json(course);
});

// Admin: create course
router.post('/courses', requireAuth, requireRole('admin'), async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  await db.read(); db.data ||= { courses: [], lastId: 0 };
  const id = ++db.data.lastId;
  const course = { id, title, description: description||'', modules: [], created_at: new Date().toISOString() };
  db.data.courses.push(course);
  await db.write();
  res.status(201).json(course);
});

// Admin: add module to course
router.post('/courses/:courseId/modules', requireAuth, requireRole('admin'), async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  await db.read(); db.data ||= { courses: [], lastId: 0 };
  const course = db.data.courses.find(c=>c.id==req.params.courseId);
  if (!course) return res.status(404).json({ error: 'course not found' });
  const moduleId = ++db.data.lastId;
  const mod = { id: moduleId, title, lessons: [] };
  course.modules.push(mod);
  await db.write();
  res.status(201).json(mod);
});

// Admin: add lesson to module
router.post('/courses/:courseId/modules/:moduleId/lessons', requireAuth, requireRole('admin'), async (req, res) => {
  const { title, content, videoUrl } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  await db.read(); db.data ||= { courses: [], lastId: 0 };
  const course = db.data.courses.find(c=>c.id==req.params.courseId);
  if (!course) return res.status(404).json({ error: 'course not found' });
  const mod = course.modules.find(m=>m.id==req.params.moduleId);
  if (!mod) return res.status(404).json({ error: 'module not found' });
  const lessonId = ++db.data.lastId;
  const lesson = { id: lessonId, title, content: content||'', videoUrl: videoUrl||'', created_at: new Date().toISOString() };
  mod.lessons.push(lesson);
  await db.write();
  res.status(201).json(lesson);
});

// Student marks lesson completed
router.post('/progress', requireAuth, async (req, res) => {
  const { courseId, moduleId, lessonId } = req.body;
  if (!courseId || !moduleId || !lessonId) return res.status(400).json({ error: 'courseId,moduleId,lessonId required' });
  await db.read(); db.data ||= { progress: [], lastId: 0 };
  const id = ++db.data.lastId;
  const p = { id, userId: req.user.id, courseId, moduleId, lessonId, completed_at: new Date().toISOString() };
  db.data.progress.push(p);
  await db.write();
  res.status(201).json(p);
});

// Get user's progress
router.get('/progress/me', requireAuth, async (req, res) => {
  try {
    await db.read();
  } catch (err) {
    console.error('failed reading db in lms/progress/me', err);
    return res.json([]);
  }

  if (!db.data || !Array.isArray(db.data.progress)) db.data = { ...db.data, progress: [] };
  const rows = (db.data.progress || []).filter(p => p.userId == req.user.id);
  res.json(rows);
});

// Generate / record certificate (simple stub)
router.post('/courses/:courseId/certificate', requireAuth, async (req, res) => {
  const courseId = req.params.courseId;
  await db.read(); db.data ||= { certificates: [], lastId: 0 };
  const id = ++db.data.lastId;
  const cert = { id, userId: req.user.id, courseId, issued_at: new Date().toISOString(), certificateData: { name: req.user.email || req.user.id } };
  db.data.certificates.push(cert);
  await db.write();
  res.status(201).json(cert);
});

// --- Quizzes ---
// Admin: create a quiz for a course
router.post('/courses/:courseId/quizzes', requireAuth, requireRole('admin'), async (req, res) => {
  const { title, questions } = req.body; // questions: [{id, text, choices:[..], answerIndex}]
  if (!title || !Array.isArray(questions)) return res.status(400).json({ error: 'title and questions required' });
  await db.read(); db.data ||= { quizzes: [], lastId: 0 };
  const id = ++db.data.lastId;
  const quiz = { id, courseId: req.params.courseId, title, questions, created_at: new Date().toISOString() };
  db.data.quizzes.push(quiz);
  await db.write();
  res.status(201).json(quiz);
});

// Student: submit quiz attempt
router.post('/quizzes/:quizId/attempts', requireAuth, async (req, res) => {
  const { answers } = req.body; // answers: [choiceIndex,...]
  if (!Array.isArray(answers)) return res.status(400).json({ error: 'answers required' });
  await db.read(); db.data ||= { quizzes: [], attempts: [], lastId: 0 };
  const quiz = db.data.quizzes.find(q => String(q.id) === String(req.params.quizId));
  if (!quiz) return res.status(404).json({ error: 'quiz not found' });
  // simple scoring
  let score = 0;
  quiz.questions.forEach((q, i) => { if (answers[i] == q.answerIndex) score++; });
  const percent = Math.round((score / quiz.questions.length) * 100);
  const id = ++db.data.lastId;
  const attempt = { id, quizId: quiz.id, userId: req.user.id, answers, score, percent, created_at: new Date().toISOString() };
  db.data.attempts.push(attempt);
  await db.write();
  res.status(201).json(attempt);
});

// Get single quiz by id
router.get('/quizzes/:quizId', requireAuth, async (req, res) => {
  await db.read(); db.data ||= { quizzes: [] };
  const quiz = db.data.quizzes.find(q => String(q.id) === String(req.params.quizId));
  if (!quiz) return res.status(404).json({ error: 'quiz not found' });
  res.json(quiz);
});

// Get user's quiz attempts / grades
router.get('/quizzes/me', requireAuth, async (req, res) => {
  await db.read(); db.data ||= { attempts: [] };
  const rows = db.data.attempts.filter(a => a.userId == req.user.id);
  res.json(rows);
});

export default router;
