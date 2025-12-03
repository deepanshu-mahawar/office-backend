import mongoose, { Schema, Document } from "mongoose";

export interface IMentor extends Document {
  name: string;
  email: string;
  password: string;
  department: string;
  specialization: string;
  phone: string;
  experience: string;
  company: string;
  expertise: string;
}

const MentorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    specialization: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: String, required: true },
    company: { type: String, required: true },
    expertise: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMentor>("Mentor", MentorSchema);
