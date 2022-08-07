const express = require('express');
const {
  getListUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const router = express.Router();
//Protect route middleware
const { protect } = require('../middleware/auth');

module.exports = router;
