import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/certificates/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
});

export default upload;
