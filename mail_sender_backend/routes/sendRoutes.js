const express = require("express");
const Template = require("../models/Template");
const Recipient = require("../models/Recipient");
const History = require("../models/History");
const transporter = require("../config/mailer");
const multer = require("multer");
const path = require("path");

require("dotenv").config();

const router = express.Router();

// Configure multer (store in uploads/)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure "uploads" folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage });

// Send bulk emails with resume
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    console.log("Request Body:", req.body); // 🔍 Debug
    console.log("Uploaded File:", req.file);

    let { templateId, recipientIds, userId } = req.body;
    const resumePath = req.file ? req.file.path : null;

    //ensure recipient_ids is always an array
    if (typeof recipientIds === "string") {
      try {
        recipientIds = JSON.parse(recipientIds); // parse if string
      } catch (err) {
        return res.status(400).json({ msg: "Invalid recipientIds format" });
      }
    }

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ msg: "Template not found" });
    }

    const recipients = await Recipient.find({ _id: { $in: recipientIds } });
    if (recipients.length === 0) {
      return res.status(404).json({ msg: "No recipients found" });
    }

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
                filename: "resume" + path.extname(req.file.originalname),
                path: resumePath
              }
            ]
          : []
      });
    }

    await new History({
      userId,
      templateId,
      recipients: recipients.map(r => r.email),
      status: "sent"
    }).save();

    res.json({ msg: "Emails sent successfully with resume!" });
  } catch (err) {
    console.error("Error sending emails:", err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
