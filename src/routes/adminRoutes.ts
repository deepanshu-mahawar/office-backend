import express from "express";
import { registerAdmin, loginAdmin, getAllStudents, deleteStudent, getAllMentorsAdmin, deleteMentor, deleteProject, getAllProjects, getAdminById, updateUserProfile } from "../controllers/adminController";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.get("/students", getAllStudents);
router.delete("/students/:studentId", deleteStudent);


router.get("/mentors", getAllMentorsAdmin);
router.delete("/mentors/:mentorId", deleteMentor);


router.get("/projects", getAllProjects);
router.delete("/projects/:projectId", deleteProject);

router.get("/:adminId", getAdminById);

router.put("/:role/:userId", updateUserProfile);


export default router;
