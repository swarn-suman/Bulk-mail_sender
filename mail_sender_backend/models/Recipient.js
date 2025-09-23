const mongoose = require("mongoose");


const recipientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  email: String,
  company: String,
  position: String
}, { timestamps: true });

export default mongoose.model("Recipient", recipientSchema);
