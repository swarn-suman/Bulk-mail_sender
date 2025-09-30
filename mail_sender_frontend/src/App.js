import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import TemplateForm from "./components/TemplateForm";
import SendEmail from "./components/SendEmail";
import History from "./components/History";


const Home = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
    <h1>Welcome to Bulk Mail Sender</h1>
  </div>
);

const Footer = () => (
  <footer className="text-center py-3 mt-5 bg-light border-top">
    <p className="mb-0">© {new Date().getFullYear()} Swarn Suman. All rights reserved.</p>
  </footer>
);

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Mail Sender</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/template" className="nav-link">Template</NavLink>
              <NavLink to="/send" className="nav-link">Send Email</NavLink>
              <NavLink to="/history" className="nav-link">History</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/template" element={<TemplateForm />} />
          <Route path="/send" element={<SendEmail />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
