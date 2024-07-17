const connectDB = require('./config/db.js')
const users = require('./data/users.js')
const User = require('./model/userModel.js')
const dotenv = require('dotenv')


dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

     await User.insertMany(users);

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