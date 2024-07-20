const mongoose = require("mongoose");
const User = require("../model/userModel.js");
const generateToken = require("../utils/generateToken.js");
const asyncHandler = require("../middleware/asyncHandler.js");
const AppError = require("../utils/appError.js");
const Score = require("../model/scoreModel.js");

// @desc  Auth user & token
// @route POST /api/v1/user/login
// access public
exports.authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.status(200).json({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return next(new AppError("Invalid Email or Password", 400));
  }
  res.send("auth user");
});

// @desc   register user
// @route  POST /api/v1/user/register
// access  public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExits = await User.findOne({ email });

  if (userExits) {
    return next(new AppError("user already exits", 400));
  }

  if (password.length < 8) {
    return next(new AppError("password must be at least 8 characters", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    const token = generateToken(user._id);

    res.status(200).json({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return next(new AppError("Invalid user data", 400));
  }
});

// @desc   logout user / clear cookie
// @route  POST /api/v1/user/logout
// access  private
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged Out Successfully" });
});

// @desc      save user score
// @route     POST /api/v1/user/score/
// @access    Private
exports.saveScore = asyncHandler(async (req, res, next) => {
  const { score, quizName, userId, totalMarks } = req.body;

  const newScore = new Score({ userId, quizName, score, totalMarks });
  await newScore.save();
  res.status(201).json({
    status: "success",
    data: newScore,
  });
});

// @desc      Get score details by user ID
// @route     GET /api/v1/user/score/:id
// @access    Private
exports.getScore = asyncHandler(async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.params.id);

  const scoreDetail = await Score.find({ userId: userId }).select('-__v');

  if (!scoreDetail) {
    return next(new AppError("No score details found", 404));
  }

  res.status(200).json({
    status: "success",
    data: scoreDetail,
  });
});
