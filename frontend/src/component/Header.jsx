// src/Navbar.js
import React, { useState, useEffect, useCallback } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoginStatus = useCallback(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token !== null);
  }, []);

  useEffect(() => {
    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [checkLoginStatus]);

  const logoutHandle = () => {
    const userConfirmed = window.confirm("Are you sure you want to logout?");
    if (userConfirmed) {
      localStorage.removeItem("token");
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
            {!isLoggedIn && (
              <>
                <Nav.Link href="/">Home</Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Nav.Link href="/quiz">Quiz</Nav.Link>
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
