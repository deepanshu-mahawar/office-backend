import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Student from "../models/studentModel";
import jwt from "jsonwebtoken";

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, password, department, year, phone, github_link } =
      req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Email already registered. Try logging in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Student.create({
      name,
      email,
      password: hashedPassword,
      department,
      year,
      phone,
      github_link,
    });

    return res.status(201).json({
      message: "Student registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Student Registration Error:", error);
    return res.status(500).json({
      message: "Server error. Please try again.",
      success: false,
    });
  }
};

export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        department: student.department,
        year: student.year,
        phone: student.phone,
        github_link: student.github_link,
        role: student.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};


export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "studentId is required",
      });
    }

    const student = await Student.findById(studentId).select("-password");
    // Remove password from response

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error: any) {
    console.error("Error getting student:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching student",
      error: error.message,
    });
  }
};