const express = require('express');
const { getListCourses, getCourse } = require('../controllers/courses');

const router = express.Router({ mergeParams: true });

router.route('/').get(getListCourses);

router.route('/:id').get(getCourse);

module.exports = router;
