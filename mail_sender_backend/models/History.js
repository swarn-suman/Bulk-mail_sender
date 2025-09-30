const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: "Template", required: true },
  recipients: [String],
  status: { type: String, default: "sent" },
}, { timestamps: true }); // ✅ adds createdAt & updatedAt

module.exports = mongoose.model("History", historySchema);
