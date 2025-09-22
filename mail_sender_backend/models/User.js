const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);
