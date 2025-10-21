import { join } from 'path';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const file = join(process.cwd(), 'server-data.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
db.data ||= { users: [], programs: [], lastId: 0 };

export default db;
