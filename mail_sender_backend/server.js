const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const database = require("./config/database");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

app.use(cors());



