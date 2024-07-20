import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const QuizQuestionsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizData } = location.state || {};
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [quizName, setQuizname] = useState(quizData.title);

  const [selectedOptions, setSelectedOptions] = useState({});
  const timerSec =
    quizData?.questions.reduce((acc, el) => acc + el.timer, 0) || 0;

  const totalMarks = quizData?.questions?.length * 5;

  useEffect(() => {
    if (timerSec > 0) {
      setTimer(timerSec);
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            handleSubmit();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      setIntervalId(countdown);

      return () => clearInterval(countdown);
    }
  }, [timerSec]);

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
      clearInterval(intervalId);
      const response = await fetch(
        `http://localhost:5000/api/v1/quiz/${quizData._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: selectedOptions,
          }),
        }
      );
      const result = await response.json();
      const resultArr = result?.data;
      const temp = resultArr.filter((el) => el.isCorrect);
      const newScore = temp.length * 5;
      setScore(newScore);
      saveScore(token, newScore, quizName, totalMarks);
      setSelectedOptions({});

      setTimeout(() => {
        window.alert(`Your score is: ${newScore}`);
        navigate("/quiz");
      }, 2000);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const isSubmitDisabled = Object.keys(selectedOptions).length === 0;

  const saveScore = async (token, score, quizName,totalMarks) => {
    const userId = localStorage.getItem("userId");

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ score, quizName, userId, totalMarks }),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/user/score",
        config
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error saving score:", error);
      throw error;
    }
  };

  return (
    <Container>
      <Button variant="success" className=" text-center my-4">
        <Link to="/quiz" className="text-white text-decoration-none">
          Back
        </Link>
      </Button>

      <Row className="align-items-center mb-3">
        <Col xs={6}>
          <h4>{quizData.title}</h4>
        </Col>

        <Col xs={2} className="text-end">
          <h4> Timer: {timer}</h4>
        </Col>

        <Col xs={2} className="text-end">
          <h4> Score: {score} </h4>
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
