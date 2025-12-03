import express from "express";
import upload from "../middleware/upload";
import {
  getProjectsByMentor,
  getProjectsByStudent,
  uploadProject,
} from "../controllers/projectController";

const router = express.Router();

router.post("/create", upload.single("certificate"), uploadProject);
router.get("/student/:studentId", getProjectsByStudent);
router.get("/mentor/:mentorId", getProjectsByMentor);

export default router;
