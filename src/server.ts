import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import studentRoutes from "./routes/studentRoutes";
import mentorRoutes from "./routes/mentorRoutes";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();
connectDB();

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
