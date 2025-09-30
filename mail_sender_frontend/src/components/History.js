import React, { useEffect, useState } from "react";
import { Container, Table, Card, Spinner } from "react-bootstrap";
import api from "../api/api";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/send/history"); // matches backend route
        setHistory(res.data);
      } catch (err) {
        console.error("Error fetching history:", err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="mb-3 text-center">Sent Email History</h2>
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : history.length === 0 ? (
          <p className="text-center">No email history found.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Template</th>
                <th>Recipients</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h._id}>
                  <td>{h.templateId?.subject || h.templateId}</td>
                  <td>
                    {h.recipients && h.recipients.length > 0
                      ? h.recipients.join(", ")
                      : "No recipients"}
                  </td>
                  <td>{h.status}</td>
                  <td>{new Date(h.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default History;
