const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const quizzes = [
    {
      title: "JavaScript Basics",
      description: "A quiz on basic JavaScript concepts.",
      questions: [
        {
          questionText: "What is the output of `console.log(typeof null)`?",
          options: [
            { optionText: "object", isCorrect: true },
            { optionText: "null", isCorrect: false },
            { optionText: "undefined", isCorrect: false },
            { optionText: "number", isCorrect: false }
          ],
          timer: 30
        },
        {
          questionText: "Which of the following is a JavaScript framework?",
          options: [
            { optionText: "React", isCorrect: true },
            { optionText: "Laravel", isCorrect: false },
            { optionText: "Django", isCorrect: false },
            { optionText: "Flask", isCorrect: false }
          ],
          timer: 30
        }
      ],
      createdBy:  new ObjectId("6697fea5f998e3d0c0f055f0")
    },
    {
      title: "HTML & CSS Basics",
      description: "A quiz on basic HTML and CSS concepts.",
      questions: [
        {
          questionText: "What does HTML stand for?",
          options: [
            { optionText: "Hyper Text Markup Language", isCorrect: true },
            { optionText: "Hyperlinks and Text Markup Language", isCorrect: false },
            { optionText: "Home Tool Markup Language", isCorrect: false },
            { optionText: "Hyperlinking Text Management Language", isCorrect: false }
          ],
          timer: 30
        },
        {
          questionText: "Which CSS property is used to change the text color?",
          options: [
            { optionText: "color", isCorrect: true },
            { optionText: "font-color", isCorrect: false },
            { optionText: "text-color", isCorrect: false },
            { optionText: "background-color", isCorrect: false }
          ],
          timer: 30
        }
      ],
      createdBy:  new ObjectId("6697fea5f998e3d0c0f055f0")
    },
    {
      title: "Node.js Fundamentals",
      description: "A quiz on fundamental Node.js concepts.",
      questions: [
        {
          questionText: "Which of the following is a Node.js module?",
          options: [
            { optionText: "fs", isCorrect: true },
            { optionText: "http", isCorrect: true },
            { optionText: "path", isCorrect: true },
            { optionText: "all of the above", isCorrect: true }
          ],
          timer: 30
        },
        {
          questionText: "What is the command to initialize a Node.js project?",
          options: [
            { optionText: "npm init", isCorrect: true },
            { optionText: "npm start", isCorrect: false },
            { optionText: "node init", isCorrect: false },
            { optionText: "node start", isCorrect: false }
          ],
          timer: 30
        }
      ],
      createdBy:  new ObjectId("6697fea5f998e3d0c0f055f0")
    },
    {
      title: "React Basics",
      description: "A quiz on basic React concepts.",
      questions: [
        {
          questionText: "What is a component in React?",
          options: [
            { optionText: "A function or class that renders UI", isCorrect: true },
            { optionText: "A module in Node.js", isCorrect: false },
            { optionText: "A type of HTML element", isCorrect: false },
            { optionText: "A CSS property", isCorrect: false }
          ],
          timer: 30
        },
        {
          questionText: "Which hook is used to manage state in a functional component?",
          options: [
            { optionText: "useState", isCorrect: true },
            { optionText: "useEffect", isCorrect: false },
            { optionText: "useContext", isCorrect: false },
            { optionText: "useReducer", isCorrect: false }
          ],
          timer: 30
        }
      ],
      createdBy:  new ObjectId("6697fea5f998e3d0c0f055f0")
    },
    {
      title: "Express.js Basics",
      description: "A quiz on basic Express.js concepts.",
      questions: [
        {
          questionText: "How do you install Express.js?",
          options: [
            { optionText: "npm install express", isCorrect: true },
            { optionText: "npm init express", isCorrect: false },
            { optionText: "npm start express", isCorrect: false },
            { optionText: "npm express init", isCorrect: false }
          ],
          timer: 30
        },
        {
          questionText: "Which method is used to create a server in Express?",
          options: [
            { optionText: "express()", isCorrect: true },
            { optionText: "createServer()", isCorrect: false },
            { optionText: "initServer()", isCorrect: false },
            { optionText: "new Express()", isCorrect: false }
          ],
          timer: 30
        }
      ],
      createdBy:  new ObjectId("6697fea5f998e3d0c0f055f0")
    },
    {
      title: "Database Basics",
      description: "A quiz on basic database concepts.",
      questions: [
        {
          questionText: "Which SQL command is used to create a table?",
          options: [
            { optionText: "CREATE TABLE", isCorrect: true },
            { optionText: "ADD TABLE", isCorrect: false },
            { optionText: "MAKE TABLE", isCorrect: false },
            { optionText: "NEW TABLE", isCorrect: false }
          ],
          timer: 30
        },
        {
          questionText: "Which of the following is a NoSQL database?",
          options: [
            { optionText: "MongoDB", isCorrect: true },
            { optionText: "MySQL", isCorrect: false },
            { optionText: "PostgreSQL", isCorrect: false },
            { optionText: "SQLite", isCorrect: false }
          ],
          timer: 30
        }
      ],
      createdBy:  new ObjectId("6697fea5f998e3d0c0f055f0")
    },
    {
      title: "CSS Flexbox",
      description: "A quiz on CSS Flexbox layout.",
      questions: [
        {
          questionText: "Which property is used to create a flex container?",
          options: [
            { optionText: "display: flex;", isCorrect: true },
            { optionText: "flex: container;", isCorrect: false },
            { optionText: "flexbox: true;", isCorrect: false },
            { optionText: "display: box;", isCorrect: false }
          ],
          timer: 30
        },
        {
          questionText: "Which property is used to align items in a flex container?",
          options: [
            { optionText: "align-items", isCorrect: true },
            { optionText: "justify-content", isCorrect: false },
            { optionText: "align-content", isCorrect: false },
            { optionText: "flex-align", isCorrect: false }
          ],
          timer: 30
        }
      ],
      createdBy:  new ObjectId("6697fea5f998e3d0c0f055f0")
    },
    {
      title: "Git Basics",
      description: "A quiz on basic Git commands and concepts.",
      questions: [
        {
          questionText: "Which command is used to initialize a new Git repository?",
          options: [
            { optionText: "git init", isCorrect: true },
            { optionText: "git start", isCorrect: false },
            { optionText: "git new", isCorrect: false },
            { optionText: "git create", isCorrect: false }
          ],
          timer: 30
        },
        {
          questionText: "Which command is used to stage changes for the next commit?",
          options: [
            { optionText: "git add", isCorrect: true },
            { optionText: "git stage", isCorrect: false },
            { optionText: "git commit", isCorrect: false },
            { optionText: "git push", isCorrect: false }
          ],
          timer: 30
        }
      ],
      createdBy:  new ObjectId("6697fea5f998e3d0c0f055f0")
    },
    {
      title: "Python Basics",
      description: "A quiz on basic Python programming concepts.",
      questions: [
        {
          questionText: "What is the output of `print(type(3.14))`?",
          options: [
            { optionText: "<class 'float'>", isCorrect: true },
            { optionText: "<class 'int'>", isCorrect: false },
            { optionText: "<class 'double'>", isCorrect: false },
            { optionText: "<class 'str'>", isCorrect: false }
          ],
          timer: 30
        },
        {
          questionText: "Which keyword is used to define a function in Python?",
          options: [
            { optionText: "def", isCorrect: true },
            { optionText: "func", isCorrect: false },
            { optionText: "function", isCorrect: false },
            { optionText: "define", isCorrect: false }
          ],
          timer: 30
        }
      ],
      createdBy:  new ObjectId("6697fea5f998e3d0c0f055f0")
    },
    {
      title: "Data Structures",
      description: "A quiz on basic data structures.",
      questions: [
        {
          questionText: "Which data structure uses LIFO (Last In First Out)?",
          options: [
            { optionText: "Stack", isCorrect: true },
            { optionText: "Queue", isCorrect: false },
            { optionText: "Array", isCorrect: false },
            { optionText: "Linked List", isCorrect: false }
          ],
          timer: 30
        },
        {
          questionText: "Which data structure uses FIFO (First In First Out)?",
          options: [
            { optionText: "Queue", isCorrect: true },
            { optionText: "Stack", isCorrect: false },
            { optionText: "Tree", isCorrect: false },
            { optionText: "Graph", isCorrect: false }
          ],
          timer: 30
        }
      ],
      createdBy:  new ObjectId("6697fea5f998e3d0c0f055f0")
    }
  ];
  
  module.exports = quizzes;
  