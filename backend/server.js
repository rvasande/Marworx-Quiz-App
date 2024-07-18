const connectDB = require("./config/db");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception shutting down.....');
  console.log(`${err.name} = ${err.message}`);
  process.exit(1);
});

connectDB();

const app = require("./app");

const port = process.env.PORT || 5000 || 3000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
