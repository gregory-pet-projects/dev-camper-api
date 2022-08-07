const express = require('express');
const {
  getListUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const User = require('../models/User');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();
//Protect route middleware
const { protect, authorize } = require('../middleware/auth');

//Protect for all routes
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advancedResults(User), getListUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
