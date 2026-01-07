const BASE = "http://localhost:5000";

export const getJobs = async (params = {}) => {
  const q = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/jobs?${q}`);
  return res.json();
};

export const getJobById = async (id) => {
  const res = await fetch(`${BASE}/jobs/${id}`);
  return res.json();
};

export const createJob = async (data) => {
  await fetch(`${BASE}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const runJob = async (id) => {
  await fetch(`${BASE}/run-job/${id}`, { method: "POST" });
};
