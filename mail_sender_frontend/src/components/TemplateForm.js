import React, { useState } from "react";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import api from "../api/api";

const TemplateForm = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId") || process.env.REACT_APP_DEFAULT_USER_ID;
      const res = await api.post("/templates", { subject, body, userId });
      alert(res.data.msg || "Template created successfully!");
      setSubject(""); setBody("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error creating template.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="mb-3 text-center">Create Template</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="success" className="w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Create Template"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default TemplateForm;
