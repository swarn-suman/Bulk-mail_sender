import React, { useState } from "react";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import api from "../api/api";

const SendEmail = () => {
  const [templateId, setTemplateId] = useState("");
  const [recipientFile, setRecipientFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!templateId || !recipientFile) {
      alert("Template ID and recipient CSV are required!");
      return;
    }

    // Get userId from localStorage or .env for development
    const userId = localStorage.getItem("userId") || process.env.REACT_APP_DEFAULT_USER_ID;

    const formData = new FormData();
    formData.append("templateId", templateId);
    formData.append("userId", userId);
    formData.append("recipients", recipientFile);
    if (resumeFile) formData.append("resume", resumeFile);

    try {
      setLoading(true);

      // Axios instance automatically sends token from api.js
      const res = await api.post("/send", formData);

      alert(res.data.msg);

      // Reset form
      setTemplateId("");
      setRecipientFile(null);
      setResumeFile(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error sending emails.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="mb-3 text-center">Send Bulk Email</h2>
        <Form onSubmit={handleSend}>
          <Form.Group className="mb-3">
            <Form.Label>Template ID</Form.Label>
            <Form.Control
              type="text"
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Recipient CSV</Form.Label>
            <Form.Control
              type="file"
              accept=".csv"
              onChange={(e) => setRecipientFile(e.target.files[0])}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Resume (optional)</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
          </Form.Group>

          <Button type="submit" variant="success" className="w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Send Emails"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SendEmail;
