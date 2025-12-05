import express from "express";
import upload from "../middleware/upload";
import {
  getProjectsByMentorId,
  getProjectsByStudentId,
  uploadProject,
} from "../controllers/projectController";
import { addProjectFeedback } from "../controllers/projectFeedbackController";

const router = express.Router();

router.post("/create", upload.single("certificate"), uploadProject);
router.get("/student/:studentId", getProjectsByStudentId);
router.get("/mentor/:mentorId", getProjectsByMentorId);
router.post("/:projectId/feedbacks", addProjectFeedback);

export default router;
