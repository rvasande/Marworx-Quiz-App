import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const HomeScreen = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Our App</h1>
      <div className="mt-4">
        <Link to="/login">
          <Button variant="primary" className="me-2">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="secondary">
            Register
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default HomeScreen;
