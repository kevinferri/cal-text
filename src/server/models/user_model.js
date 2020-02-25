const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Application = require('../lib/application');

const userSchema = mongoose.Schema({
  googleId: {
    type: String,
  },
  googleToken: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  verificationCode: {
    type: Number,
  },
});

userSchema.methods.generateJwt = function() {
  return jwt.sign({ payload: this }, Application.getConfig('JWT_USER_SECRET'));
};

module.exports = mongoose.model('User', userSchema);
