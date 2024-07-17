const express = require("express");
const globalErrorHandler = require("./controller/errorController");
const AppError = require('./utils/appError')
const cors = require("cors");
const cookieParser = require('cookie-parser')
const userRoute = require('./route/userRoute')
const quizRoute = require('./route/quizRoute')

const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(cookieParser())

app.use('/api/v1/user',userRoute)
app.use('/api/v1/quiz',quizRoute)

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
