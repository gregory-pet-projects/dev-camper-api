const express = require('express');
const {
  getListCourses,
  getCourse,
  addCourse,
} = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

router.route('/').get(getListCourses).post(addCourse);

router.route('/:id').get(getCourse);

module.exports = router;
