import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const dbPath = path.resolve(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Create tables if they don't exist
export function initDb() {
    db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      featured_image TEXT,
      category TEXT,
      tags TEXT,
      author TEXT,
      publish_date DATETIME,
      status TEXT DEFAULT 'draft',
      meta_title TEXT,
      meta_description TEXT,
      focus_keyword TEXT,
      canonical_url TEXT,
      robots_index BOOLEAN DEFAULT 1,
      og_title TEXT,
      og_description TEXT,
      og_image TEXT,
      twitter_card TEXT,
      schema_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

    // Seed admin user if not exists
    const adminExists = db.prepare('SELECT * FROM users WHERE username = ?').get('linos');
    if (!adminExists) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync('linos001', salt);
        db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run('linos', hash);
        console.log('Admin user "linos" created.');
    }

    // Ensure uploads directory exists
    const uploadDir = path.resolve(process.cwd(), 'public/uploads/blog');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
}

export default db;
