const express = require("express");
const Template = require("../models/Template");
const Recipient = require("../models/Recipient");
const History = require("../models/History");
const transporter = require("../config/mailer");

const router = express.Router();

// Create template
router.post("/", async (req, res) => {
  try {
    const { userId, title, subject, body } = req.body;
    const template = new Template({ userId, title, subject, body });
    await template.save();
    res.json(template);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all templates
router.get("/:userId", async (req, res) => {
  const templates = await Template.find({ userId: req.params.userId });
  res.json(templates);
});

export default router;
