const express = require('express');
const {
  getListBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');

const advancedResults = require('../middleware/advancedResults');
const Bootcamp = require('../models/Bootcamp');

//Include other resource router
const courseRouter = require('./courses');

const router = express.Router();

//Protect route middleware
const { protect } = require('../middleware/auth');

//Re-route into other resource routes
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:postcode/:distance').get(getBootcampsInRadius);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getListBootcamps)
  .post(protect, createBootcamp);

router.route('/:id/photo').put(protect, bootcampPhotoUpload);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
