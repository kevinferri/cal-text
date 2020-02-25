const User = require('../models/user_model');
const UserResponse = require('../responses/user_response');
const twilioClient = require('../lib/twilio_client');

exports.POST = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { phoneNumber } = req.body;
  user.phoneNumber = phoneNumber;
  await user.save();

  twilioClient.messages
    .create({
      body: 'Your verification code is TODO',
      to: 'TODO',
      from: 'TODO',
    })
    .catch(err => {
      console.log(err);
    });

  return res.json(new UserResponse(user));
};
