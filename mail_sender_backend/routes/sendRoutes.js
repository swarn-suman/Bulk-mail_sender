const express = require("express");
const Template = require("../models/Template");
const Recipient = require("../models/Recipient");
const History = require("../models/History");
const transporter = require("../config/mailer");

require("dotenv").config();

const router = express.Router();

// Send bulk emails
router.post("/", async (req, res) => {
  try {
    const { templateId, recipientIds, userId } = req.body;

    console.log("📩 Incoming Request Body:", req.body);

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ msg: "Template not found" });
    }

    const recipients = await Recipient.find({ _id: { $in: recipientIds } });
    console.log("👥 Recipients Found:", recipients);

    if (!recipients.length) {
      return res.status(400).json({ msg: "No recipients found" });
    }

    for (const r of recipients) {
      const subject = template.subject
        .replace("{{name}}", r.name || "")
        .replace("{{company}}", r.company || "");

      const body = template.body
        .replace("{{name}}", r.name || "")
        .replace("{{company}}", r.company || "")
        .replace("{{position}}", r.position || "");

      console.log(`📤 Sending to ${r.email}...`);

      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: r.email,
        subject,
        text: body,
      });

      console.log(`✅ Sent to ${r.email}: ${info.response}`);
    }

    await new History({
      userId,
      templateId,
      recipients: recipients.map((r) => r.email),
      status: "sent",
    }).save();

    res.json({ msg: "Emails sent successfully!" });
  } catch (err) {
    console.error("❌ Error in send route:", err);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
