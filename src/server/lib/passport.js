const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user_model.js');
const Application = require('../lib/application');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: Application.getConfig('GOOGLE_AUTH_CLIENT_ID'),
        clientSecret: Application.getConfig('GOOGLE_AUTH_CLIENT_SECRET'),
        callbackURL: Application.getConfig('GOOGLE_AUTH_CALLBACK_URL'),
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      },
      (token, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }, (err, user) => {
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              googleId: profile.id,
              googleToken: token,
              name: profile.displayName,
              email: profile.emails[0].value,
              picture: profile.photos[0].value,
              refreshToken: refreshToken,
              phoneNumber: null,
            }).save();

            return done(null, newUser);
          }
        });
      },
    ),
  );
};
