import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const QuizScreen = () => {
  const [quiz, setQuiz] = useState([]);

  const getQuiz = async (token) => {
    try {
      const url = "http://localhost:5000/api/v1/quiz";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setQuiz(data.data.quizs);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getQuiz(token);
    } else {
      console.error("Token not found in localStorage");
    }
  }, []);

  return (
    <Container className="my-4">
      <Row>
        {quiz.map((quizItem) => (
          <Col key={quizItem._id} xs={12} md={6} lg={4}>
            <Card style={{ marginBottom: "20px" }}>
              <Card.Body>
                <Card.Title>{quizItem.title}</Card.Title>
                <Card.Text>{quizItem.description}</Card.Text>
                <Link
                  to={`/quiz/${quizItem._id}`}
                  state={{ quizData: quizItem }}
                  className="btn btn-primary"
                >
                  Start Quiz
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default QuizScreen;
