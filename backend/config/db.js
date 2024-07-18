const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// console.log(process.env.DATABASE_LOCAL);
const connectDB = async ()=>{
    try {
        // const conn = await mongoose.connect(process.env.DATABASE_LOCAL)
        const conn = await mongoose.connect("mongodb://localhost:27017/quiz")
        console.log(`mongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error : ${error}`);
        process.exit(1)
    }
}

module.exports = connectDB