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

    const template = await Template.findById(templateId);
    const recipients = await Recipient.find({ _id: { $in: recipientIds } });

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
        text: body
      });
    }

    await new History({
      userId,
      templateId,
      recipients: recipients.map(r => r.email),
      status: "sent"
    }).save();

    res.json({ msg: "✅ Emails sent successfully!" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
