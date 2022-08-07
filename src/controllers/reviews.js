const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc Get all reviews
//@route GET /api/v1/reviews
//@route GET /api/v1/bootcamps/:bootcampID/reviews
//@access Public
exports.getListReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    //Get courses for specific bootcamp
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

//@desc Get single review
//@route GET /api/v1/reviews/:id
//@access Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });
  if (!review) {
    next(new ErrorResponse(`No review with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});
