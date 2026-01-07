"use client";

import Link from "next/link";
import { runJob, deleteJob } from "../lib/api";

export default function JobTable({ jobs = [], onRefresh }) {
  if (!Array.isArray(jobs)) {
    return <p className="text-red-600">Jobs data invalid</p>;
  }

  const handleRun = async (id) => {
    await runJob(id);
    onRefresh();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this job?")) return;
    await deleteJob(id);
    onRefresh();
  };

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">ID</th>
          <th className="border p-2">Task</th>
          <th className="border p-2">Priority</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id} className="text-center">
            <td className="border p-2">{job.id}</td>
            <td className="border p-2">{job.taskName}</td>
            <td className="border p-2">{job.priority}</td>
            <td className="border p-2">{job.status}</td>
            <td className="border p-2 space-x-2">
              <Link
                href={`/jobs/${job.id}`}
                className="text-blue-600 underline"
              >
                View
              </Link>

              <button
                onClick={() => handleRun(job.id)}
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                Run
              </button>

              <button
                onClick={() => handleDelete(job.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
