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
      technologies: technologies.split(",").map((t: string) => t.trim()),
      mentorId,
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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error uploading project",
      error,
    });
  }
};
