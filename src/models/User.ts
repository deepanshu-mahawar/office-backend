// import mongoose, { Document, Schema } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   studentId: string;
//   department: string;
//   year: string;
//   phone: string;
//   githubLink?: string;
// }

// const UserSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   studentId: { type: String, required: true, unique: true },
//   department: { type: String, required: true },
//   year: { type: String, required: true },
//   phone: { type: String, required: true },
//   githubLink: { type: String },
// });

// export default mongoose.model<IUser>("User", UserSchema);
