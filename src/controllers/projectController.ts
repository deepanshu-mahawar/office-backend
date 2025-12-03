import { Request, Response } from "express";
import { Project } from "../models/projectModel";

export const uploadProject = async (req: Request, res: Response) => {
  try {
    const {
      title,
      project_type,
      description,
      company,
      startDate,
      endDate,
      technologies,
      mentorId,
      projectUrl,
      studentId,
    } = req.body;

    const certificate = req.file ? req.file.filename : "";

    const newProject = await Project.create({
      title,
      project_type,
      description,
      company,
      startDate,
      endDate,
      technologies: technologies
        ? technologies.split(",").map((t: string) => t.trim())
        : [],
      mentorId: mentorId || null,
      studentId,
      projectUrl,
      certificate,
    });

    return res.status(201).json({
      success: true,
      message: "Project submitted successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("Error uploading project:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading project",
      error,
    });
  }
};

export const getProjectsByStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    const projects = await Project.find({ studentId }).populate("mentorId");

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Error fetching student projects:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

export const getProjectsByMentor = async (req: Request, res: Response) => {
  try {
    const { mentorId } = req.params;

    if (!mentorId) {
      return res.status(400).json({
        success: false,
        message: "Mentor ID is required",
      });
    }

    const projects = await Project.find({ mentorId }).populate("studentId");

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Error fetching mentor projects:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};
