const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const security = (app) => {
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
};
module.exports = security;
