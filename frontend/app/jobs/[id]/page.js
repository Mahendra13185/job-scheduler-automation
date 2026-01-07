export const dynamic = "force-static";
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/jobs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Job not found");
        }
        return res.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading job details...</p>;
  }

  if (!job) {
    return <p className="p-6 text-red-600">Job not found</p>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Job Details</h1>

      <div className="space-y-2">
        <p><strong>ID:</strong> {job.id}</p>
        <p><strong>Task:</strong> {job.taskName}</p>
        <p><strong>Priority:</strong> {job.priority}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Created At:</strong> {job.createdAt}</p>
        <p>
          <strong>Completed At:</strong>{" "}
          {job.completedAt || "—"}
        </p>
      </div>

      <div>
        <h2 className="font-semibold mt-4">Payload</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(
            typeof job.payload === "string"
              ? JSON.parse(job.payload)
              : job.payload,
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
