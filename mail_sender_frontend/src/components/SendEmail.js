import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import api from "../api/api";

const SendEmail = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [recipientFile, setRecipientFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch templates from backend
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await api.get("/templates/"); // Adjust if your backend needs userId
        setTemplates(res.data);
      } catch (err) {
        console.error("Error fetching templates:", err);
      }
    };
    fetchTemplates();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!selectedTemplate || !recipientFile) {
      alert("Please select a template and upload a recipient CSV!");
      return;
    }

    const formData = new FormData();
    formData.append("templateId", selectedTemplate);
    formData.append("recipients", recipientFile);
    if (resumeFile) formData.append("resume", resumeFile);

    try {
      setLoading(true);
      const res = await api.post("/send/send", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.msg || "Emails sent successfully!");
      // Reset form
      setSelectedTemplate("");
      setRecipientFile(null);
      setResumeFile(null);
    } catch (err) {
      console.error("Send email error:", err);
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
          {/* Template Selection */}
          <Form.Group className="mb-3">
            <Form.Label>Select Template</Form.Label>
            <Form.Control
              as="select"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              required
            >
              <option value="">-- Select Template --</option>
              {templates.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.subject} – {t.body.length > 50 ? t.body.slice(0, 50) + "..." : t.body}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Recipient CSV */}
          <Form.Group className="mb-3">
            <Form.Label>Recipient CSV</Form.Label>
            <Form.Control
              type="file"
              accept=".csv"
              onChange={(e) => setRecipientFile(e.target.files[0])}
              required
            />
          </Form.Group>

          {/* Optional Resume */}
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
