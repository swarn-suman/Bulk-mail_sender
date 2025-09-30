const express = require("express");
const router = express.Router();
const Template = require("../models/Template");
const History = require("../models/History");
const transporter = require("../config/mailer");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Send bulk email
router.post("/send", upload.fields([
  { name: "recipients", maxCount: 1 },
  { name: "resume", maxCount: 1 }
]), async (req, res) => {
  try {
    const templateId = req.body.templateId;
    const resumePath = req.files?.resume ? req.files.resume[0].path : null;
    const recipientFile = req.files?.recipients?.[0];

    if (!templateId || !recipientFile) {
      return res.status(400).json({ msg: "Template and recipient CSV are required." });
    }

    const template = await Template.findById(templateId);
    if (!template) return res.status(404).json({ msg: "Template not found." });

    // Read CSV
    const recipients = [];
    fs.createReadStream(recipientFile.path)
      .pipe(csv())
      .on("data", row => { if (row.email) recipients.push(row); })
      .on("end", async () => {
        if (recipients.length === 0) return res.status(400).json({ msg: "No recipients found in CSV." });

        // Send emails
        for (const r of recipients) {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: r.email,
            subject: template.subject.replace("{{name}}", r.name || "").replace("{{company}}", r.company || ""),
            text: template.body
              .replace("{{name}}", r.name || "")
              .replace("{{company}}", r.company || "")
              .replace("{{position}}", r.position || ""),
            attachments: resumePath ? [{ filename: "resume" + path.extname(resumePath), path: resumePath }] : [],
          });
        }

        // Save history
        const history = new History({
          templateId,
          recipients: recipients.map(r => r.email),
          status: "sent",
        });
        await history.save();

        res.json({ msg: "Emails sent successfully!" });
      })
      .on("error", err => {
        console.error(err);
        res.status(500).json({ msg: "Error reading CSV file." });
      });

  } catch (err) {
    console.error("Send email error:", err);
    res.status(500).json({ msg: err.message });
  }
});

// Fetch history with template subject populated
router.get("/history", async (req, res) => {
  try {
    const history = await History.find()
      .populate("templateId", "subject") // populate template subject
      .sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;
