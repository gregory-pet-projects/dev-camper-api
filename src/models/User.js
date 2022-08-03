const mongoose = require('mongoose');
const { emailRegex } = require('../utils/regex');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [emailRegex, 'Please add a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'publisher'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Users', UserSchema);
