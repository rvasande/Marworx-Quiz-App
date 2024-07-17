const User = require('../model/userModel.js')
const generateToken = require('../utils/generateToken.js')
const asyncHandler = require('../middleware/asyncHandler.js')


// @desc  Auth user & token
// @route POST /api/v1/user/login
// access public
exports.authUser = asyncHandler(async (req, res) => {
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
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error("user already exits");
  }

  if(password.length < 8){
    res.status(400)
    throw new Error('password must be at least 8 characters')
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
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   logout user / clear cookie
// @route  POST /api/v1/user/logout
// access  private
exports.logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged Out Successfully" });
});


// module.exports = {authUser, registerUser, logoutUser}
