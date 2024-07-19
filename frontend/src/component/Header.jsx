// src/Navbar.js
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token !== null);
  }, []);

  const logoutHandle = () => {
    const userConfirmed = window.confirm("Are you sure you want to logout?");
    if (userConfirmed) {
      localStorage.clear();
      setIsLoggedIn(false); 
      navigate("/login");
    }
  };

  return (
    <Navbar className="custom-navbar bg-dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/quiz">( Marworx ) Quiz</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {isLoggedIn && (
              <>
                <Nav.Link href="/profile">My Profile</Nav.Link>
                <Nav.Link onClick={logoutHandle}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
