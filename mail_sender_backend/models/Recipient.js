const mongoose = require("mongoose");


const recipientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  company: String,
  position: String
}, { timestamps: true });

module.exports = mongoose.model("Recipient", recipientSchema);
