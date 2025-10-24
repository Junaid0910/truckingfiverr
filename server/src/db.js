import { join } from 'path';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const file = join(process.cwd(), 'server-data.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
// Ensure default collections exist to avoid crashes when routes expect them
// Ensure commonly-used collections exist to avoid crashes when routes expect them
db.data ||= {
	users: [],
	programs: [],
	courses: [],
	payments: [],
	documents: [],
	enrollments: [],
	progress: [],
	quizzes: [],
	attempts: [],
	certificates: [],
	notifications: [],
	profiles: [],
	lastId: 0
};

export default db;
