const mongoose = require("mongoose")

const templateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  subject: String,
  body: String
}, { timestamps: true });

module.exports = mongoose.model("Template", templateSchema);
