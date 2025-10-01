# Bulk Email Sender (Node.js + Express)

A modern and scalable **bulk email sending platform** with support for **CSV-based bulk sending, templates, attachments, and detailed history logging**.  
Perfect for newsletters, marketing campaigns, and personalized notifications.  

Built with **Node.js**, **Express**, **MongoDB**, and **Nodemailer**.

---

##  Key Features

- ** Flexible Email Composition**
  - Upload `.html` or `.txt` templates and reuse them.
  - Draft emails directly in the UI editor.
  - Store and manage templates in MongoDB.

- ** Recipient Modes**
  - **Bulk Sending**: Upload `.csv` file with an `email` column.
  - **Single Recipient**: Send quick one-off or test emails.

- ** Personalization**
  - Use CSV fields as placeholders (e.g., `$name`, `$company`) in subject and body.

- ** Attachments**
  - Attach one or more files using **Multer**.

- ** History & Logs**
  - Every campaign is logged in MongoDB (`History` model).
  - Track sent, failed, and skipped emails with timestamps.

- ** Secure Configuration**
  - Store SMTP credentials and DB connection in `.env`.
  - Supports Gmail, Outlook, or any SMTP server.

- ** Responsive UI**
  - Built with modern frontend libraries (Bootstrap/Custom CSS).
  - Real-time status updates for ongoing email campaigns.

---

##  Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Email**: Nodemailer (SMTP-based)
- **File Uploads**: Multer
- **CSV Parsing**: csv-parser
- **Templating**: EJS / Handlebars (depending on your UI choice)
- **Styling**: Bootstrap 5

---

##  Setup & Installation

###  Prerequisites
- Node.js (v14+ recommended)
- MongoDB (local or cloud e.g., MongoDB Atlas)
- npm or yarn
- Git

###  Installation Steps

```bash
# Clone repository
git clone https://github.com/your-username/bulk-email-sender.git
cd bulk-email-sender

# Install dependencies
npm install

# Create .env file
cp .env.example .env

