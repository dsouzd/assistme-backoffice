// src/components/Layout/Navbar.js
import React from 'react';
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import msg_logo from '../../assets/msg_logo.svg'; 

const NavigationBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/dashboard" className="d-flex align-items-center">
          <Image
            src={msg_logo}
            alt="Logo"
            width="100"
            height="40"
            className="d-inline-block align-top me-2"
            rounded
          />
          AssistMe BackOffice
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && (
              <>
                <Navbar.Text className="me-3">
                  Signed in as: <strong>{user.username}</strong> ({user.role})
                </Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
