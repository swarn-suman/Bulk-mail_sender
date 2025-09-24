const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const Recipient = require("../models/Recipient");
const auth = require("../middleware/auth");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload CSV of recipients
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  try {
    // Safety check: make sure user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        // Only process rows with an email
        if (data.email) {
          results.push({
            userId: req.user.id,       // link to authenticated user
            name: data.name || "",
            email: data.email,
            company: data.company || "",
            position: data.position || ""
          });
        }
      })
      .on("end", async () => {
        if (results.length === 0) {
          fs.unlinkSync(req.file.path); // cleanup
          return res.status(400).json({ error: "No valid recipients found in CSV" });
        }

        // Save recipients to MongoDB
        await Recipient.insertMany(results);
        fs.unlinkSync(req.file.path); // cleanup temp file

        console.log(`✅ ${results.length} recipients uploaded for user ${req.user.id}`);
        res.json({ message: "Recipients uploaded successfully", count: results.length });
      })
      .on("error", (err) => {
        console.error("❌ CSV parse error:", err);
        res.status(500).json({ error: "Failed to parse CSV" });
      });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Failed to upload recipients" });
  }
});

module.exports = router;
