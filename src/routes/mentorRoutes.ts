import express from "express";
import { getAllMentors, loginMentor, registerMentor } from "../controllers/mentorController";

const router = express.Router();

router.post("/register", registerMentor);
router.post("/login", loginMentor);
router.get("/", getAllMentors); 

export default router;
