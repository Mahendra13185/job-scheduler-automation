export async function triggerWebhook(job) {
  const WEBHOOK_URL = process.env.WEBHOOK_URL;

  if (!WEBHOOK_URL) {
    console.warn("⚠️ WEBHOOK_URL not set. Skipping webhook.");
    return;
  }

  const payload = {
    jobId: job.id,
    taskName: job.taskName,
    priority: job.priority,
    payload: job.payload,
    completedAt: job.completedAt,
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("✅ Webhook triggered:", res.status);
  } catch (err) {
    console.error("❌ Webhook failed:", err.message);
  }
}
