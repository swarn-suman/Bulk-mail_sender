import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Login from "./components/Login";
import Register from "./components/Register";
import TemplateForm from "./components/TemplateForm";
import SendEmail from "./components/SendEmail";
import History from "./components/History";

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Mail Sender</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/register" className="nav-link">Register</NavLink>
              <NavLink to="/template" className="nav-link">Template</NavLink>
              <NavLink to="/send" className="nav-link">Send Email</NavLink>
              <NavLink to="/history" className="nav-link">History</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/template" element={<TemplateForm />} />
          <Route path="/send" element={<SendEmail />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
