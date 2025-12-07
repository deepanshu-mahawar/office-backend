import express from "express";
import {
  getAllMentors,
  getMentorById,
  loginMentor,
  registerMentor,
  updateMentor,
} from "../controllers/mentorController";

const router = express.Router();

router.post("/register", registerMentor);
router.post("/login", loginMentor);
router.get("/", getAllMentors);
router.get("/:id", getMentorById);
router.put("/:mentorId", updateMentor);


export default router;
