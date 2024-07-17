const User = require("../model/userModel.js");
const generateToken = require("../utils/generateToken.js");
const asyncHandler = require("../middleware/asyncHandler.js");
const AppError = require("../utils/appError.js");

// @desc  Auth user & token
// @route POST /api/v1/user/login
// access public
exports.authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
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
    generateToken(res, user._id);

    res.status(200).json({
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


