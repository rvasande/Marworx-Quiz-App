import React from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const QuizQuestionsScreen = () => {
  const location = useLocation();
  const { quizData } = location.state || {}; // Adding a fallback to handle cases where location.state is null
  console.log(quizData);
  if (!quizData) {
    return <div>No quiz data available. Please go back and select a quiz.</div>;
  }

  return <Container></Container>;
};

export default QuizQuestionsScreen;
