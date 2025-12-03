import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  department: string;
  year: string;
  phone: string;
  github_link?: string;
}

const studentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    phone: { type: String, required: true },
    github_link: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model<IStudent>("Student", studentSchema);
