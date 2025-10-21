import { findUserByEmail, createUser } from './userModel.js';

async function seed() {
  const email = process.env.DEMO_EMAIL || 'demo@truckingvault.com';
  const password = process.env.DEMO_PASSWORD || 'demo123';
  const existing = await findUserByEmail(email);
  if (existing) {
    console.log('Demo user already exists:', email);
    return;
  }
  try {
    const user = await createUser({ email, password });
    console.log('Created demo user:', user.email);
  } catch (err) {
    console.error('Failed to create demo user', err);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[2] === 'run') {
  seed().then(() => process.exit(0)).catch(() => process.exit(1));
}

export default seed;
