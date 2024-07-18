import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const QuizQuestionsScreen = () => {
  const location = useLocation();
  const { quizData } = location.state || {};
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [score, setScore] = useState(0);
//   const [timer, setTimer] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState({});

  if (!quizData) {
    return (
      <div className="text-center mt-5">
        No quiz data available. Please go back and select a quiz.
      </div>
    );
  }

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/quiz/${quizData._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            //   quizId: quizData._id,
            answers: selectedOptions,
          }),
        }
      );
      const result = await response.json();
      const resultArr = result?.data;
      const temp = resultArr.filter((el) => el.isCorrect);
      temp.length === 0 ? setScore(0) : setScore(temp.length * 5);
      setSelectedOptions({});
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const isSubmitDisabled = Object.keys(selectedOptions).length === 0;

  return (
    <Container>
      <Button variant="success" className=" text-center my-4">
        <Link to="/quiz" className="text-white text-decoration-none">
          Back
        </Link>
      </Button>

      <Row className="align-items-center mb-3">
        <Col xs={8}>
          <h4>{quizData.title}</h4>
        </Col>
 
        <Col xs={2} className="text-end">
          <h4> Score: {score}</h4>
        </Col>
        <Col xs={2} className="text-end">
          <Button
            onClick={handleSubmit}
            variant="success"
            disabled={isSubmitDisabled}
          >
            Submit
          </Button>
        </Col>
      </Row>
      {quizData.questions.map((question) => (
        <Card key={question._id} className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>{question.questionText}</Card.Title>
            {question.options.map((option) => (
              <Button
                key={option._id}
                variant={
                  selectedOptions[question._id] === option._id
                    ? "primary"
                    : "outline-primary"
                }
                className="d-block mb-2 text-start"
                onClick={() => handleOptionSelect(question._id, option._id)}
              >
                {option.optionText}
              </Button>
            ))}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default QuizQuestionsScreen;
