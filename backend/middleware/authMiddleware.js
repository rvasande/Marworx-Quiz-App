const jwt = require('jsonwebtoken')
const User = require('../model/userModel.js')
const asyncHandler = require('../middleware/asyncHandler.js')

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select(-'password');
      next()
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed ");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token ");
  }
});

exports.admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401);
        throw new Error("Not Authorized as admin ");
    }
} 

