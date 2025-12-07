import express from "express";
import {
  getStudentById,
  loginStudent,
  registerStudent,
  updateStudent,
} from "../controllers/studentController";
import Student from "../models/studentModel";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/:studentId", getStudentById);
router.post("/many", async (req, res) => {
  const { ids } = req.body;
  const students = await Student.find({ _id: { $in: ids } }).select(
    "-password"
  );
  res.json({ success: true, data: students });
});
router.put("/:studentId", updateStudent);

export default router;
