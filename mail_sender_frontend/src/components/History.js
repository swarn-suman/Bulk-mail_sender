import React, { useEffect, useState } from "react";
import { Container, Table, Card } from "react-bootstrap";
import api from "../api/api";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/history");
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="mb-3 text-center">Sent Email History</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Template ID</th>
              <th>Recipients</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h._id}>
                <td>{h.templateId}</td>
                <td>{h.recipients.join(", ")}</td>
                <td>{h.status}</td>
                <td>{new Date(h.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default History;
