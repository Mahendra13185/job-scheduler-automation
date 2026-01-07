import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  runJob,
  deleteJob,
  resetJobs
} from "../controllers/jobs.controller.js";

const router = express.Router();

router.post("/jobs", createJob);
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobById);
router.post("/run-job/:id", runJob);
router.delete("/jobs/:id", deleteJob);
router.delete("/jobs", resetJobs);

export default router;
