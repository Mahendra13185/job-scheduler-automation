const BASE_URL = "https://job-scheduler-automation-backend.onrender.com";

export const getJobs = async (params = {}) => {
  const q = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/jobs?${q}`);
  return res.json();
};

export const getJobById = async (id) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`);
  return res.json();
};

export const createJob = async (data) => {
  await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const runJob = async (id) => {
  await fetch(`${BASE_URL}/jobs/run-job/${id}`, {
    method: "POST",
  });
};

export const deleteJob = async (id) => {
  await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  });
};

export const resetJobs = async () => {
  await fetch(`${BASE_URL}/jobs`, {
    method: "DELETE",
  });
};
