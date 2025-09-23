const mongoose = require("mongoose");


const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
  recipients: [String], // list of email addresses
  status: String
}, { timestamps: true });

module.exports = mongoose.model("History", historySchema);
