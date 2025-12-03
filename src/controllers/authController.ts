// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User";

// export const registerUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       department,
//       year,
//       phone,
//       github_link,
//       studentId,
//       role,
//     } = req.body;

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       res.status(400).json({ message: "Passwords do not match" });
//       return;
//     }

//     // Check if email already registered
//     const exists = await User.findOne({ email });
//     if (exists) {
//       res.status(400).json({ message: "Email already exists" });
//       return;
//     }

//     // Check if student ID already registered
//     const studentExists = await User.findOne({ studentId });
//     if (studentExists) {
//       res.status(400).json({ message: "Student ID already registered" });
//       return;
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create User
//     await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       studentId,
//       department,
//       year,
//       phone,
//       githubLink,
//     });

//     res.json({ message: "Student Registered Successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Registration Error", error });
//   }
// };

// export const loginUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.status(400).json({ message: "Invalid Email or Password" });
//       return;
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       res.status(400).json({ message: "Invalid Email or Password" });
//       return;
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login Successful",
//       token,
//       user: {
//         name: user.name,
//         email: user.email,
//         studentId: user.studentId,
//         department: user.department,
//         year: user.year,
//         phone: user.phone,
//         githubLink: user.githubLink,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Login Error", error });
//   }
// };
