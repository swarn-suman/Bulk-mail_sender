import React, { useState } from "react";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import api from "../api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/register", { name, email, password });
      alert(res.data.msg || "Registered successfully!");
      setName(""); setEmail(""); setPassword("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="mb-3 text-center">Register</h2>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Register"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
