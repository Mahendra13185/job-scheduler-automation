"use client";

import { useState } from "react";

export default function CreateJobForm({ onCreated }) {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [payload, setPayload] = useState("{}");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");

    if (!taskName.trim()) {
      setError("Task name is required");
      return;
    }

    let parsedPayload = {};

    try {
      parsedPayload = JSON.parse(payload || "{}");
    } catch {
      setError("Payload must be valid JSON");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskName,
          priority,
          payload: parsedPayload,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create job");
      }

      // Reset form
      setTaskName("");
      setPayload("{}");
      setPriority("Low");

      onCreated && onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="text-lg font-semibold">Create Job</h2>

      <input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task name"
        className="w-full border p-2 rounded"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <textarea
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        className="w-full border p-2 rounded font-mono"
        rows={3}
        placeholder='{"email":"user@test.com"}'
      />

      {error && (
        <p className="text-red-600 text-sm font-medium">{error}</p>
      )}

      <button
        onClick={submit}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Creating..." : "Create Job"}
      </button>
    </div>
  );
}
