const Quiz = require("../model/quizModel");
const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/appError.js");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

exports.getAllQuiz = asyncHandler(async (req, res, next) => {
  const quizs = await Quiz.find();

  res.status(200).json({
    status: "success",
    result: quizs.length,
    data: {
      quizs,
    },
  });
});

exports.addQuiz = asyncHandler(async (req, res, next) => {
  const { title, description, questions } = req.body;

  const quiz = new Quiz({
    title,
    description,
    questions,
    // createdBy: new ObjectId("6697fea5f998e3d0c0f055f0"),
    createdBy: req.user._id,
  });

  const createdQuiz = await quiz.save();
  res.status(201).json(createdQuiz);
});

exports.deleteQuiz = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    await Quiz.deleteOne({ _id: quiz._id });
    res.json({ message: "Quiz removed" });
  } else {
    next(new AppError("Quiz not found", 404));
  }
});

exports.getAnswer = asyncHandler(async (req, res, next) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    return next(new AppError("Quiz not found", 404));
  }

  const { answers } = req.body;
  const questions = quiz.questions;

  const result = questions.map((question) => {
    const submittedAnswerId = answers[question._id];
    const correctOption = question.options.find((option) => option.isCorrect);

    return {
      questionId: question._id,
      isCorrect: correctOption._id.toString() === submittedAnswerId,
    };
  });

  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.updateQuiz = asyncHandler(async (req, res, next) => {
  const { title, description, questions, createdBy } = req.body;

  const updatedQuiz = await Quiz.findByIdAndUpdate(
    req.params.id,
    {
      ...(title && { title }),
      ...(description && { description }),
      ...(questions && { questions }),
      ...(createdBy && { createdBy }),
    },
    { new: true, runValidators: true }
  );

  if (!updatedQuiz) {
    return next(new AppError("Quiz not found", 404));
  }

  res.status(200).json(updatedQuiz);
});
