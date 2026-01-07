import express from "express";
import cors from "cors";
import jobsRoutes from "./routes/jobs.routes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://job-scheduler-automation.vercel.app"
    ],
  })
);

app.use(express.json());

// API routes
app.use("/jobs", jobsRoutes);

// health check (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Job Scheduler Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
