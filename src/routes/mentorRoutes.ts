import express from "express";
import { loginMentor, registerMentor } from "../controllers/mentorController";

const router = express.Router();

router.post("/register", registerMentor);
router.post("/login", loginMentor);

export default router;
