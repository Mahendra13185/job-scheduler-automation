"use client";

import Link from "next/link";

export default function JobTable({ jobs = [], onRefresh }) {
  // ▶ RUN JOB
  const runJob = async (id) => {
    await fetch(`http://localhost:5000/run-job/${id}`, {
      method: "POST",
    });
    onRefresh();
  };

  // ❌ DELETE SINGLE JOB
  const deleteJob = async (id) => {
    if (!confirm("Delete this job?")) return;

    await fetch(`http://localhost:5000/jobs/${id}`, {
      method: "DELETE",
    });

    onRefresh();
  };

  if (!Array.isArray(jobs)) {
    return <p className="text-red-600">Jobs data invalid</p>;
  }

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
                onClick={() => runJob(job.id)}
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                Run
              </button>

              <button
                onClick={() => deleteJob(job.id)}
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
