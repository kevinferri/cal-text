const User = require('../models/user_model');

exports.GET = async (req, res) => {
  const user = await User.findById(req.user._id);
  const jwt = user.generateJwt();

  return res.json({
    jwt,
  });
};
