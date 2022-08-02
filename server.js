const express = require('express');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
require('colors');
const errorHandler = require('./src/middleware/error');

//Load env files
const dotenv = require('dotenv');
dotenv.config({ path: './src/config/config.env' });

//Import routes
const bootcamps = require('./src/routes/bootcamps');
const courses = require('./src/routes/courses');

const app = express();

//Body parser
app.use(express.json());

//DB
connectDB();

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

//Middleware error hanlder
app.use(errorHandler);

//Init server
const PORT = process.env.PORT || 3300;
const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

//Handler unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
