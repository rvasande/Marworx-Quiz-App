import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col,Table } from "react-bootstrap";

const ProfileScreen = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [scoreDetails, setScoreDetails] = useState([]);

  const getUserScores = async (token, userId) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/user/score/${userId}`,
        config
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setScoreDetails(data?.data);
    } catch (error) {
      console.error("Error fetching scores:", error);
      throw error;
    }
  };

  useEffect(() => {
    getUserScores(token, userId);
  }, [token, userId]);

  return (
    <Container className="my-4" >
      <Row >
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Text>Name: {name}</Card.Text>
              <Card.Text>Email: {email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Exam Details</Card.Title>
              {scoreDetails.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Quiz Name</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoreDetails.map((detail) => (
                      <tr key={detail._id}>
                        <td>{detail.quizName}</td>
                        <td>{detail.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Card.Text>No score details available.</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
