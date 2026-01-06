const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database file path
const dbPath = path.join(__dirname, "../../database.sqlite");

// Create / connect database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Failed to connect to SQLite database", err);
  } else {
    console.log("✅ Connected to SQLite database");
  }
});

// Create jobs table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      taskName TEXT NOT NULL,
      payload TEXT,
      priority TEXT CHECK(priority IN ('Low', 'Medium', 'High')),
      status TEXT CHECK(status IN ('pending', 'running', 'completed')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      completedAt DATETIME
    )
  `);
});

module.exports = db;
