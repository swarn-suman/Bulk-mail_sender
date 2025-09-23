const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const dbConnect = require("./config/database");
const cors = require("cors");

const PORT = process.env.PORT || 4000;



const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const templateRoutes = require("./routes/templateRoutes");
const recipientRoutes = require("./routes/recipientRoutes");
const sendRoutes = require("./routes/sendRoutes");

app.use(express.json());
app.use(cors());

dbConnect();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/recipients", recipientRoutes);
app.use("/api/send", sendRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
