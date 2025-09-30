const express = require("express");
const Template = require("../models/Template");
const History = require("../models/History");
const Recipient = require("../models/Recipient");
const transporter = require("../config/mailer");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ensure "uploads" folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST /send/send-email
router.post("/", upload.fields([
  { name: "recipients", maxCount: 1 }, // CSV file
  { name: "resume", maxCount: 1 } // optional resume
]), async (req, res) => {
  try {
    const templateId = req.body.templateId;
    const resumePath = req.files?.resume ? req.files.resume[0].path : null;
    const recipientFile = req.files?.recipients?.[0];

    if (!templateId || !recipientFile) {
      return res.status(400).json({ msg: "Template ID and recipient CSV are required." });
    }

    // Read recipients from CSV
    const recipients = [];
    fs.createReadStream(recipientFile.path)
      .pipe(csv())
      .on("data", (row) => {
        if (row.email) recipients.push(row);
      })
      .on("end", async () => {
        if (recipients.length === 0) {
          return res.status(400).json({ msg: "No recipients found in CSV." });
        }

        // Fetch template
        const template = await Template.findById(templateId);
        if (!template) {
          return res.status(404).json({ msg: "Template not found." });
        }

        // Send emails
        for (const r of recipients) {
          const subject = template.subject
            .replace("{{name}}", r.name || "")
            .replace("{{company}}", r.company || "");

          const body = template.body
            .replace("{{name}}", r.name || "")
            .replace("{{company}}", r.company || "")
            .replace("{{position}}", r.position || "");

          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: r.email,
            subject,
            text: body,
            attachments: resumePath
              ? [
                  {
                    filename: "resume" + path.extname(resumePath),
                    path: resumePath,
                  },
                ]
              : [],
          });
        }

        // Save history
        await new History({
          templateId,
          recipients: recipients.map((r) => r.email),
          status: "sent",
        }).save();

        res.json({ msg: "Emails sent successfully!" });
      })
      .on("error", (err) => {
        console.error(err);
        res.status(500).json({ msg: "Error reading CSV file." });
      });
  } catch (err) {
    console.error("Send email error:", err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
