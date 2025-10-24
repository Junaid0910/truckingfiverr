import { findUserByEmail, createUser } from './userModel.js';
import db from './db.js';
import bcrypt from 'bcryptjs';

async function seed() {
  const email = process.env.DEMO_EMAIL || 'admin@truckingvault.com';
  const password = process.env.DEMO_PASSWORD || 'admin123';
  const existing = await findUserByEmail(email);
  if (existing) {
    console.log('Admin user already exists:', email);
  } else {
    try {
      const hashed = bcrypt.hashSync(password, 10);
      const user = await createUser({ email, password: hashed, role: 'admin' });
      console.log('Created admin user:', user.email);
    } catch (err) {
      console.error('Failed to create admin user', err);
    }
  }

  // seed sample programs (works with lowdb)
  await db.read();
  db.data ||= { users: [], programs: [], lastId: 0 };
  if (!db.data.programs || db.data.programs.length === 0) {
    db.data.programs = [
      { id: ++db.data.lastId, title: 'Class A CDL Training', description: 'Comprehensive Class A training program', created_at: new Date().toISOString() },
      { id: ++db.data.lastId, title: 'Class B Refresher', description: 'Short course for Class B drivers', created_at: new Date().toISOString() }
    ];
    await db.write();
    console.log('Seeded sample programs (lowdb).');
  } else {
    console.log('Programs already exist, skipping program seed.');
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[2] === 'run') {
  seed().then(() => process.exit(0)).catch(() => process.exit(1));
}

export default seed;
