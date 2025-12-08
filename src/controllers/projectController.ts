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

    const certificate_path = req.file ? req.file.filename : null;

    const newProject = await Project.create({
      title,
      description,
      project_type,

      company_name: company || null,

      technologies: technologies
        ? technologies.split(",").map((t: string) => t.trim())
        : [],

      start_date: startDate ? new Date(startDate) : null,
      end_date: endDate ? new Date(endDate) : null,

      github_link: projectUrl || null,

      certificate_path,

      student_id: studentId,
      mentor_id: mentorId,

      status: "Submitted",
    });

    return res.status(201).json({
      success: true,
      message: "Project submitted successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading project",
      error,
    });
  }
};

export const getProjectsByStudentId = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      console.log("studentId missing in request params");

      return res.status(400).json({
        message: "studentId is required",
      });
    }

    const query = { student_id: studentId };

    const projects = await Project.find(query);

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    console.error("Error getting projects:", error);

    return res.status(500).json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

export const getProjectsByMentorId = async (req: Request, res: Response) => {
  try {
    const { mentorId } = req.params;

    if (!mentorId) {
      console.log("mentorId missing in request params");

      return res.status(400).json({
        message: "mentorId is required",
      });
    }

    const query = { mentor_id: mentorId };

    const projects = await Project.find(query);

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    console.error("Error getting mentor projects:", error);

    return res.status(500).json({
      message: "Error fetching mentor projects",
      error: error.message,
    });
  }
};
