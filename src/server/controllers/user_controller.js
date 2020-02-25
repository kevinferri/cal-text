const User = require('../models/user_model');
const UserResponse = require('../responses/user_response');

exports.GET = async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.json(new UserResponse(user));
};

exports.PATCH = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { phoneNumber } = req.body;
  user.phoneNumber = phoneNumber;
  await user.save();
  return res.json(new UserResponse(user));
};
