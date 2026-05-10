require('dotenv').config();
const { createClient } = require('@libsql/client');

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function migrate() {
  try {
    console.log('Creating tables...');

    // Create users table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'creator',
        channel_name TEXT,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `);
    console.log('✓ Users table created');

    // Create contents table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS contents (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        judul TEXT NOT NULL,
        deskripsi TEXT NOT NULL,
        tag TEXT NOT NULL,
        niche TEXT,
        hook TEXT,
        duration INTEGER,
        status TEXT NOT NULL DEFAULT 'draft',
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Contents table created');

    // Create trends table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS trends (
        id TEXT PRIMARY KEY,
        topic TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'horror',
        keywords TEXT NOT NULL,
        popularity INTEGER NOT NULL DEFAULT 0,
        trending_score REAL NOT NULL DEFAULT 0,
        source TEXT,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `);
    console.log('✓ Trends table created');

    // Create performas table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS performas (
        id TEXT PRIMARY KEY,
        content_id TEXT NOT NULL,
        views INTEGER NOT NULL DEFAULT 0,
        likes INTEGER NOT NULL DEFAULT 0,
        comments INTEGER NOT NULL DEFAULT 0,
        shares INTEGER NOT NULL DEFAULT 0,
        watch_time INTEGER NOT NULL DEFAULT 0,
        engagement_rate REAL NOT NULL DEFAULT 0,
        recorded_at INTEGER NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        FOREIGN KEY (content_id) REFERENCES contents(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Performas table created');

    console.log('\n✅ All tables created successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    client.close();
  }
}

migrate();
