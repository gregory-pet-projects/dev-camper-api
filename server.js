const express = require('express');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('colors');
const errorHandler = require('./src/middleware/error');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
//Security packages
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

//Load env files
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

//Import routes
const bootcamps = require('./src/routes/bootcamps');
const courses = require('./src/routes/courses');
const auth = require('./src/routes/auth');
const users = require('./src/routes/users');
const reviews = require('./src/routes/reviews');

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//DB
connectDB();

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//File uploading
app.use(fileupload());

//==== Security middleware ====
//==
//Sanitize data from SQL injections
app.use(mongoSanitize());

//Set sucurity headers
app.use(helmet());

//Prevent XSS ataks
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100, // Allow only 100 requests for 10 mins
});
app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());
//==
//==============================

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

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
