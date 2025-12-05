import { Request, Response } from "express";
import { Project } from "../models/projectModel";

export const addProjectFeedback = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { mentor_id, grade, remarks, status } = req.body;

    if (!mentor_id || !grade || !remarks) {
      return res.status(400).json({
        success: false,
        message: "mentor_id, grade & remarks are required",
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    project.mentor_id = mentor_id;
    project.grade = grade;
    project.feedback = remarks;

    // If frontend sends a status → update it
    if (status) {
      project.status = status;
    }

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Feedback submitted successfully",
      data: project,
    });
  } catch (error) {
    console.error("Feedback Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error submitting feedback",
    });
  }
};
