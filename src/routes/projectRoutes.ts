import express from "express";
import upload from "../middleware/upload";
import {
  getProjectsByStudentId,
  uploadProject,
} from "../controllers/projectController";

const router = express.Router();

router.post("/create", upload.single("certificate"), uploadProject);
router.get("/student/:studentId", getProjectsByStudentId);
// router.get("/mentor/:mentorId", getProjectsByMentor);

export default router;
