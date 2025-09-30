import React, { useState } from "react";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import api from "../api/api";

const RecipientUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a CSV file!");

    const formData = new FormData();
    formData.append("recipients", file);
    const userId = localStorage.getItem("userId") || process.env.REACT_APP_DEFAULT_USER_ID;
    formData.append("userId", userId);

    try {
      setLoading(true);
      const res = await api.post("/recipients/upload", formData);
      alert(res.data.msg || "Recipients uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error uploading recipients.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="mb-3 text-center">Upload Recipients</h2>
        <Form onSubmit={handleUpload}>
          <Form.Group className="mb-3">
            <Form.Label>Recipient CSV</Form.Label>
            <Form.Control type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} required />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Upload CSV"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default RecipientUpload;
