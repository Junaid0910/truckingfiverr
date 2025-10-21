import db from './db.js';
import { getPool } from './db_mysql.js';

export async function findUserByEmail(email) {
  const pool = await getPool();
  if (pool) {
    const [rows] = await pool.query('SELECT id,email,password,role,created_at FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  }
  await db.read();
  // ensure db.data is initialized (lowdb returns null if file missing/empty)
  db.data ||= { users: [], programs: [], lastId: 0 };
  return db.data.users.find(u => u.email === email) || null;
}

export async function createUser({ email, password, role = 'student' }) {
  const pool = await getPool();
  if (pool) {
    const [res] = await pool.query('INSERT INTO users (email,password,role) VALUES (?, ?, ?)', [email, password, role]);
    return { id: res.insertId, email, role };
  }
  await db.read();
  // ensure db.data is initialized before writing
  db.data ||= { users: [], programs: [], lastId: 0 };
  const id = ++db.data.lastId;
  const user = { id, email, password, role, created_at: new Date().toISOString() };
  db.data.users.push(user);
  await db.write();
  return { id: user.id, email: user.email, role: user.role };
}
