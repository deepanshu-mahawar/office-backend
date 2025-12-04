import { Request, Response } from "express";
import Mentor from "../models/mentorModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerMentor = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      department,
      specialization,
      phone,
      experience,
      company,
      expertise,
    } = req.body;

    const existing = await Mentor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const mentor = await Mentor.create({
      name,
      email,
      password: hashed,
      department,
      specialization,
      phone,
      experience,
      company,
      expertise,
    });

    res.status(201).json({
      success: true,
      message: "Mentor registered successfully",
      mentor,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginMentor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const mentor = await Mentor.findOne({ email });
    if (!mentor) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, mentor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: mentor._id, role: "mentor" },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      user: mentor,
      token,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMentors = async (req: Request, res: Response) => {
  try {
    const mentors = await Mentor.find().select("name expertise _id");

    const formatted = mentors.map((m) => ({
      id: m._id,
      name: m.name,
      expertise: m.expertise,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mentors", error });
  }
};

export const getMentorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Mentor ID is required",
      });
    }

    const mentor = await Mentor.findById(id).select(
      "name email phone department specialization expertise experience company _id"
    );

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    return res.status(200).json({
      success: true,
      mentor,
    });
  } catch (error: any) {
    console.error("Error fetching mentor:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching mentor",
      error: error.message,
    });
  }
};
