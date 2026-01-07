import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Singleton DB instance
let db;

async function initDB() {
  if (db) return db;

  db = await open({
    filename: "./jobs.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      taskName TEXT NOT NULL,
      payload TEXT,
      priority TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      completedAt DATETIME
    )
  `);

  console.log("✅ Database initialized");
  return db;
}

export default initDB;
