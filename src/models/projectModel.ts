import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  github_link?: string;
  upload_date: Date;
  status: string;
  project_type: string;
  company_name?: string;
  technologies: string[];
  start_date?: Date;
  end_date?: Date;
  certificate_path?: string;
  student_id: mongoose.Types.ObjectId;
  mentor_id: mongoose.Types.ObjectId;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    github_link: { type: String },

    upload_date: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      default: "Submitted",
    },

    project_type: { type: String, required: true },

    company_name: { type: String },

    technologies: [
      {
        type: String,
        required: true,
      },
    ],

    start_date: { type: Date },
    end_date: { type: Date },

    certificate_path: { type: String },

    student_id: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    mentor_id: {
      type: Schema.Types.ObjectId,
      ref: "Mentor",
      required: true,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
