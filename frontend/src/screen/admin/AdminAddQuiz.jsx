// src/components/AddQuiz.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const AddQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: [
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false },
        { optionText: '', isCorrect: false }
      ],
      timer: 30
    }
  ]);
  const [error, setError] = useState('');

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index][event.target.name] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    if (event.target.name === 'isCorrect') {
      newQuestions[qIndex].options.forEach((opt, index) => {
        opt.isCorrect = index === oIndex ? event.target.checked : false;
      });
    } else {
      newQuestions[qIndex].options[oIndex][event.target.name] = event.target.value;
    }
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        options: [
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false },
          { optionText: '', isCorrect: false }
        ],
        timer: 30
      }
    ]);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, qIndex) => qIndex !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate questions
    for (const question of questions) {
      if (question.options.length !== 4) {
        setError('Each question must have exactly 4 options.');
        return;
      }
      const correctOptions = question.options.filter(option => option.isCorrect);
      if (correctOptions.length !== 1) {
        setError('Each question must have exactly one correct option.');
        return;
      }
    }

    setError('');

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/api/v1/quiz/admin/add-quiz',
        { title, description, questions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Quiz added:', response.data);
    } catch (error) {
      console.error('Error adding quiz:', error);
    }
  };

  return (
    <Container fluid className="my-5">
      <Row>
        <Col md={6} className="offset-md-3">
          <div className="bg-light p-4 border rounded">
            <h2 className="mb-4 text-center">Add Quiz</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter quiz title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="form-control-sm"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter quiz description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="form-control-sm"
                />
              </Form.Group>

              {questions.map((question, qIndex) => (
                <div key={qIndex} className="mb-4 border p-3 rounded">
                  <h4 className="mb-3">Question {qIndex + 1}</h4>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteQuestion(qIndex)}
                    className="mb-3"
                  >
                    Delete Question
                  </Button>
                  <Form.Group className="mb-3">
                    <Form.Label>Question Text</Form.Label>
                    <Form.Control
                      type="text"
                      name="questionText"
                      placeholder="Enter question text"
                      value={question.questionText}
                      onChange={(e) => handleQuestionChange(qIndex, e)}
                      required
                      className="form-control-sm"
                    />
                  </Form.Group>

                  {question.options.map((option, oIndex) => (
                    <Form.Group className="mb-3" key={oIndex}>
                      <Form.Label>Option {oIndex + 1}</Form.Label>
                      <Row>
                        <Col sm={8} md={8}>
                          <Form.Control
                            type="text"
                            name="optionText"
                            placeholder="Enter option text"
                            value={option.optionText}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                            required
                            className="form-control-sm"
                          />
                        </Col>
                        <Col sm={4} md={4}>
                          <Form.Check
                            type="radio"
                            name={`question-${qIndex}`} // Ensures all options for a question are in the same group
                            label="Correct"
                            checked={option.isCorrect}
                            onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                          />
                        </Col>
                      </Row>
                    </Form.Group>
                  ))}
                </div>
              ))}
              <Row className="mb-4">
                <Col className="d-flex justify-content-between">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleAddQuestion}
                  >
                    Add Another Question
                  </Button>
                  <Button
                    type="submit"
                    variant="success"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddQuiz;
