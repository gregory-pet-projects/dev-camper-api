const express = require('express');
const {
  getListBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} = require('../controllers/bootcamps');

//Include other resource router
const courseRouter = require('./courses');

const router = express.Router();

//Re-route into other resource routes
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:postcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getListBootcamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
