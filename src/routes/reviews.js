const express = require('express');
const { getListReviews, getReview } = require('../controllers/reviews');
const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

router.route('/').get(
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description',
  }),
  getListReviews
);

router.route('/:id').get(getReview);

module.exports = router;
