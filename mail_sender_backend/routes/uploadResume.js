// routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// store resumes in "uploads/" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage });

// Upload resume
router.post("/resume", upload.single("resume"), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" });
  res.json({
    msg: "Resume uploaded successfully",
    path: req.file.path, // return file path to frontend
  });
});

module.exports = router;
