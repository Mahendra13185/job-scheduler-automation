"use client";

import { useEffect, useState } from "react";
import CreateJobForm from "../components/CreateJobForm";
import JobTable from "../components/JobTable";
import { getJobs, resetJobs } from "../lib/api";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleReset = async () => {
    await resetJobs();
    fetchJobs();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Job Scheduler Dashboard</h1>

      <CreateJobForm onCreated={fetchJobs} />

      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handleReset}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Reset Jobs
      </button>

      <JobTable jobs={jobs} onRefresh={fetchJobs} />
    </div>
  );
}
