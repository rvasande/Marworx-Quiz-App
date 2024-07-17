const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: [
    {
      optionText: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean,
        required: true
      }
    }
  ],
  timer: {
    type: Number,
    required: false
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  questions: [questionSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
},
{
    timestamps:true
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
