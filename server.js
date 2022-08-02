const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
require('colors');
const errorHandler = require('./src/middleware/error');
dotenv.config({ path: './src/config/config.env' });
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

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);
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
