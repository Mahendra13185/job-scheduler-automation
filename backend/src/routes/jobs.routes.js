import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  runJob,
  deleteJob,
  resetJobs,
} from "../controllers/jobs.controller.js";

const router = express.Router();

// 👇 NO /jobs HERE
router.post("/", createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/run-job/:id", runJob);
router.delete("/:id", deleteJob);
router.delete("/", resetJobs);

export default router;
