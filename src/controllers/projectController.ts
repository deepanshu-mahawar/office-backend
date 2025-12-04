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


// export const getProjectsByStudent = async (req: Request, res: Response) => {
//   try {
//     const { studentId } = req.params;

//     if (!studentId) {
//       return res.status(400).json({
//         success: false,
//         message: "Student ID is required",
//       });
//     }

//     const projects = await Project.find({ studentId }).populate("mentorId");

//     return res.status(200).json({
//       success: true,
//       projects,
//     });
//   } catch (error) {
//     console.error("Error fetching student projects:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch projects",
//     });
//   }
// };


export const getProjectsByStudentId = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        message: "studentId is required",
      });
    }

    const projects = await Project.find({ student_id: studentId })
      .populate("student_id", "name email")
      .populate("mentor_id", "name email")
      .populate("reviews")
      .populate("feedbacks");

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


// export const getProjectsByMentor = async (req: Request, res: Response) => {
//   try {
//     const { mentorId } = req.params;

//     if (!mentorId) {
//       return res.status(400).json({
//         success: false,
//         message: "Mentor ID is required",
//       });
//     }

//     const projects = await Project.find({ mentorId }).populate("studentId");

//     return res.status(200).json({
//       success: true,
//       projects,
//     });
//   } catch (error) {
//     console.error("Error fetching mentor projects:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch projects",
//     });
//   }
// };
