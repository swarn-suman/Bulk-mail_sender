# 📬 Bulk Mail Sender Web App

A modern, full-stack **Bulk Email Sender** web application that allows users to create email templates, upload recipient lists via CSV, attach resumes, and send personalized bulk emails.  
It also maintains a **history of sent emails**, showing the subject, recipients, and status.

Built with **React.js**, **Node.js/Express**, **MongoDB**, and **Nodemailer**.

---

<p align="center">
  <img src="https://raw.githubusercontent.com/swarn-suman/Bulk-mail_sender/refs/heads/main/Screenshot 1.png" alt="Live Screenshot of App" style="border-radius: 10px; max-width: 100%; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
</p>

---

## ✨ Key Features

- ✨ User authentication (JWT-based).
- 📂 Create and manage **email templates** (with placeholders like `{{name}}`, `{{company}}`, `{{position}}`).
- 📑 Upload **recipient lists via CSV** (with fields like `name`, `email`, `company`, `position`).
- 📎 Attach a resume (optional) to all outgoing emails.
- 📤 Send personalized bulk emails using **Nodemailer**.
- 📜 View **email sending history** (shows subject, recipients, and status).
- 🕒 Timestamped history with MongoDB storage.
- 🌐 Full responsive **React Bootstrap UI**

---

## 🛠 Tech Stack

### **Frontend (React.js)**
- React.js
- React Bootstrap
- Axios (API requests)
- JWT Authentication
- File Upload (CSV + resume)

### **Backend (Node.js + Express)**
- Express.js
- Multer (file uploads)
- Nodemailer (sending emails)
- CSV-Parser (parse recipient CSV)
- Bcrypt (password hashing)
- JWT (authentication)

### **Database**
- MongoDB + Mongoose

---

## 🛠️ Setup & Installation

Follow these steps to set up the application locally.

### ✅ Prerequisites
* Node.js (v16+ recommended)
* npm or yarn
* MongoDB (local or Atlas cloud cluster)
* Git

---

### 🚀 Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/swarn-suman/Bulk-mail_sender.git 
   cd Bulk-mail_sender
   ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    **Configure Environment Variables**:
    *   **Copy the example file**:
        ```bash
        cp .env.example .env
        ```
        *(On Windows, you might use `copy .env.example .env`)*
    *   **Edit the `.env` file** with your actual SMTP credentials and desired default display name. See the section below for details.

### 🔒 Environment Variables (`.env` File)

Create a file named `.env` inside backend/ and add the following variables:

```dotenv
# .env - DO NOT COMMIT THIS FILE TO GIT!

PORT=5000
MONGO_URI=your MongoDB_URL
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

**Important Notes**:

*   **Security**: **NEVER** commit your `.env` file to version control (Git). The `.gitignore` file should ideally prevent this, but always be cautious.
*   **App Passwords**: If using Gmail or some other providers, it's highly recommended (or required) to enable 2-Factor Authentication (2FA) and generate an **App Password** specifically for this application instead of using your main account password.
    *   [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833?hl=en)

**Run backend**:
```bash
    npm run dev
```
The application will start, usually on `http://localhost:5000` or `http://0.0.0.0:5000/` (accessible on your local network). Open the URL in your web browser.

2.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    ```
    **Configure Environment Variables**:
    *   **Copy the example file**:
        ```bash
        cp .env.example .env
        ```
        *(On Windows, you might use `copy .env.example .env`)*
    *   **Edit the `.env` file** with your actual SMTP credentials and desired default display name. See the section below for details.

### 🔒 Environment Variables (`.env` File)

Create a file named `.env` inside frontend/ and add the following variables:

```dotenv
# .env - DO NOT COMMIT THIS FILE TO GIT!

REACT_APP_API_URL=http://localhost:5000/api

**Run frontend**:
```bash
    npm start
```
The application will start, usually on `http://127.0.0.1:3000/` or `http://0.0.0.0:3000/` (accessible on your local network). Open the URL in your web browser.

## 📄 Example CSV File for Bulk Sending

When using the "Upload Recipients" option, your CSV file structure is crucial.

*   **Required Header**: It **MUST** contain a column header for email addresses. The application looks for common names like `email`, `email address`, `email_address`, `e-mail`, or `recipient` (case-insensitive). It will also try to find any header containing `mail` if the common ones aren't present.
*   **Encoding**: UTF-8 encoding (with or without BOM) is recommended. Latin-1 is supported as a fallback.
*   **Delimiter**: Standard comma (`,`) delimiter is expected. The app attempts to sniff the dialect but defaults to comma-separated.

**Example `recipients.csv` file:**

```csv
email,name,company,position
alice@example.com,Alice,TechCorp,Software Engineer
bob@example.com,Bob,InnoTech,Data Analyst
```

**Key points from the example:**

*   The `Email` column is present and contains the recipient addresses.
*   Required: email column
*   Optional: name, company, position (used for personalization in template placeholder

## 🚀 How to Use

1.  **Create Template**:
    *   Go to the "Create Template" page.
    *   Add title, subject (e.g., "Hello {{name}}"), and body with placeholders.

2.  **Send Emails**:
    *   Select a template from dropdown.
    *   Upload a CSV file with recipients.
    *   (Optional) Attach a resume or file.
    *   Click "Send".

3.  **View History**:
    *   Navigate to "History" page.
    *   See past emails with subjects & recipients.

## 📁 Project Structure

```
bulk-email-sender/
├── backend/
│   ├── models/
│   │   ├── Template.js       # Template schema
│   │   ├── History.js        # Email history schema
│   │
│   ├── routes/
│   │   ├── templateRoutes.js # Create & fetch templates
│   │   ├── sendRoutes.js     # Send email + history
│   │
│   ├── config/
│   │   ├── database.js       
│   │   ├── mailer.js         # Nodemailer config
│   ├── uploads/              # Stores uploaded CSVs & resumes
│   ├── server.js             # Express server
│   └── .env                  # Env vars for backend
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateTemplate.js
│   │   │   ├── SendEmail.js
│   │   │   ├── History.js
│   │   │   └── Footer.js
│   │   ├── App.js
│   │   └── index.js
│   └── .env                  # Env vars for frontend
│
└── README.md
```


