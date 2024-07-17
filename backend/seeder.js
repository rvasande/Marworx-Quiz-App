const connectDB = require('./config/db.js')
const users = require('./data/users.js')
const User = require('./model/userModel.js')
const quizs = require('./data/quizs.js')
const Quiz = require('./model/quizModel.js')
const dotenv = require('dotenv')


dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Quiz.deleteMany()

     await User.insertMany(users);
     await Quiz.insertMany(quizs);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {

    await User.deleteMany();
    await Quiz.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}