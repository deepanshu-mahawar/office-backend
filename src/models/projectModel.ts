import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  mentorId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  certificateUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    mentorId: {
      type: Schema.Types.ObjectId,
      ref: "Mentor",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    techStack: [
      {
        type: String,
        required: true,
      },
    ],

    githubLink: {
      type: String,
    },

    liveLink: {
      type: String,
    },

    certificateUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
