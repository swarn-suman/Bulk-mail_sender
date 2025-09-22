const mongoose = require("mongoose")

const templateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  subject: String,
  body: String
}, { timestamps: true });

export default mongoose.model("Template", templateSchema);
