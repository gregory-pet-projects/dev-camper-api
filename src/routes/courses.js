const express = require('express');
const {
  getListCourses,
  getCourse,
  addCourse,
  updateCourse,
} = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

router.route('/').get(getListCourses).post(addCourse);

router.route('/:id').get(getCourse).put(updateCourse);

module.exports = router;
