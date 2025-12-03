import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  project_type: string;
  description: string;
  company?: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  mentorId?: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  projectUrl?: string;
  certificate?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    project_type: {
      type: String,
      required: true,
      enum: ["project", "internship", "training"],
    },

    description: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      default: "",
    },

    startDate: {
      type: String,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },

    technologies: [
      {
        type: String,
        required: true,
      },
    ],

    mentorId: {
      type: Schema.Types.ObjectId,
      ref: "Mentor",
      default: null,
    },

    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    projectUrl: {
      type: String,
      default: "",
    },

    certificate: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
