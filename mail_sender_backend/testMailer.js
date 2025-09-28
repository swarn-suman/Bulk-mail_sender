// testMailer.js
const transporter = require("./config/mailer");
require("dotenv").config();

async function sendTestMail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,             // sender email from .env
      to: "swarnsuman2001@gmail.com",          // 👈 put your own email here
      subject: "Test Email from Nodemailer",
      text: "Hello! This is a test email sent directly from testMailer.js"
    });

    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

sendTestMail();
