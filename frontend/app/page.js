"use client";

import { useEffect, useState } from "react";
import CreateJobForm from "../components/CreateJobForm";
import JobTable from "../components/JobTable";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await fetch("http://localhost:5000/jobs");
    const data = await res.json();
    setJobs(Array.isArray(data) ? data : []);
  };

  // 🔁 auto refresh every 2 seconds
  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 2000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 RESET ALL JOBS
  const resetJobs = async () => {
    if (!confirm("Are you sure you want to delete all jobs?")) return;

    await fetch("http://localhost:5000/jobs", {
      method: "DELETE",
    });

    fetchJobs();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Job Scheduler Dashboard</h1>

      <CreateJobForm onCreated={fetchJobs} />

      <div className="flex gap-4">
        <select className="border px-2 py-1 rounded">
          <option>All</option>
        </select>

        <button
          onClick={resetJobs}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reset Jobs
        </button>
      </div>

      <JobTable jobs={jobs} onRefresh={fetchJobs} />
    </div>
  );
}
