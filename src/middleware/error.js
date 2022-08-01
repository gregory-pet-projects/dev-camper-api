const ErrorResponse = require("../utils/ErrorResponse");
const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message;
    error.name = err.constructor.name

    // Log to console for dev
    console.log(error);

    // Mongoose bad ObjectId
    if (error.name === 'CastError') {
        const message = `Resource not found with id of ${error.value}`;
        error = new ErrorResponse(message, 404);
    }

    //Mongoose duplicate key
    if (error.code === 11000) {
        const message = `Duplicate field value entered`
        error = new ErrorResponse(message, 400)
    }

    //Mongoose validation
    if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(val => val.properties.message)
        error = new ErrorResponse(message, 400)
    }


    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler