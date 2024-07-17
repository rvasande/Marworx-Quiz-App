const express = require("express");
const globalErrorHandler = require("./controller/errorController");
const AppError = require('./utils/appError')
const cors = require("cors");
const userRoute = require('./route/userRoute')

const app = express();

app.use(cors());

app.use('/api/v1/users',userRoute)

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});

app.use(globalErrorHandler);

module.exports = app;
