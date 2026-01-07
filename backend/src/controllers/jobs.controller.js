import initDB from "../database/db.js";
import { triggerWebhook } from "../services/webhook.service.js";

/**
 * CREATE JOB
 */
export async function createJob(req, res) {
  try {
    const { taskName, payload = {}, priority } = req.body;
    if (!taskName || !priority) {
      return res.status(400).json({ message: "Task name and priority are required" });
    }

    const db = await initDB();

    const result = await db.run(
      `INSERT INTO jobs (taskName, payload, priority, status)
       VALUES (?, ?, ?, 'pending')`,
      taskName,
      JSON.stringify(payload),
      priority
    );

    res.json({
      id: result.lastID,
      taskName,
      priority,
      status: "pending",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create job" });
  }
}

/**
 * GET JOBS
 */
export async function getJobs(req, res) {
  try {
    const db = await initDB(); // ✅ THIS WAS MISSING OR BROKEN
    const jobs = await db.all(
      "SELECT * FROM jobs ORDER BY id ASC"
    );
    res.json(jobs);
  } catch (err) {
    console.error("Get Jobs Error:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
}


/**
 * GET JOB BY ID
 */
export async function getJobById(req, res) {
  try {
    const db = await initDB();
    const job = await db.get("SELECT * FROM jobs WHERE id = ?", req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job" });
  }
}

/**
 * RUN JOB
 */
export async function runJob(req, res) {
  try {
    const db = await initDB();
    const { id } = req.params;

    const job = await db.get("SELECT * FROM jobs WHERE id = ?", id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.status !== "pending")
      return res.status(400).json({ message: "Job already processed" });

    await db.run(
      `UPDATE jobs SET status='running', updatedAt=CURRENT_TIMESTAMP WHERE id=?`,
      id
    );

    res.json({ message: "Job started" });

    setTimeout(async () => {
      await db.run(
        `UPDATE jobs
         SET status='completed',
             completedAt=CURRENT_TIMESTAMP,
             updatedAt=CURRENT_TIMESTAMP
         WHERE id=?`,
        id
      );

      const completedJob = await db.get("SELECT * FROM jobs WHERE id=?", id);
      await triggerWebhook(completedJob);
    }, 3000);
  } catch (err) {
    res.status(500).json({ message: "Failed to run job" });
  }
}

/**
 * DELETE JOB
 */
export async function deleteJob(req, res) {
  try {
    const db = await initDB();

    await db.run("DELETE FROM jobs WHERE id=?", req.params.id);

    // Re-sequence IDs
    await db.exec(`
      CREATE TEMP TABLE temp_jobs AS SELECT * FROM jobs;
      DELETE FROM jobs;
      DELETE FROM sqlite_sequence WHERE name='jobs';
      INSERT INTO jobs (taskName, payload, priority, status, createdAt, updatedAt, completedAt)
      SELECT taskName, payload, priority, status, createdAt, updatedAt, completedAt
      FROM temp_jobs;
      DROP TABLE temp_jobs;
    `);

    res.json({ message: "Job deleted and IDs resequenced" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete job" });
  }
}


/**
 * RESET JOBS
 */
export async function resetJobs(req, res) {
  try {
    const db = await initDB();

    // delete all jobs
    await db.run("DELETE FROM jobs");

    // reset auto-increment counter
    await db.run("DELETE FROM sqlite_sequence WHERE name='jobs'");

    res.json({ message: "All jobs deleted and ID reset" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reset jobs" });
  }
}

