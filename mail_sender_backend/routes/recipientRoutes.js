const express = require("express");
const Template = require("../models/Template");
const Recipient = require("../models/Recipient");
const History = require("../models/History");
const transporter = require("../config/mailer");

const router = express.Router();

// Upload recipients
router.post("/upload", async (req, res) => {
  try {
    const recipients = req.body; // expects array of { name, email, company, position }
    await Recipient.insertMany(recipients);
    res.json({ msg: "Recipients uploaded successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get recipients
router.get("/:userId", async (req, res) => {
  const recipients = await Recipient.find({ userId: req.params.userId });
  res.json(recipients);
});

module.exports = router
