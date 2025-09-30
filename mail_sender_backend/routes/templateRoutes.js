const express = require("express");
const Template = require("../models/Template");

const router = express.Router();

// Create template
router.post("/", async (req, res) => {
  try {
    const { title, subject, body } = req.body; // removed userId since no login
    const template = new Template({ title, subject, body });
    await template.save();
    res.json(template);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all templates
router.get("/", async (req, res) => {
  try {
    const templates = await Template.find(); // fetch all templates
    res.json(templates);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
