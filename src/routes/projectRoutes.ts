import express from "express";
import upload from "../middleware/upload";
import { uploadProject } from "../controllers/projectController";

const router = express.Router();

router.post("/create", upload.single("certificate"), uploadProject);

export default router;
