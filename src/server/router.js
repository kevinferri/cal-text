const userController = require('./controllers/user_controller');
const bootstrapController = require('./controllers/bootstrap_controller');
const authController = require('./controllers/auth_controller');
const userVerificationController = require('./controllers/user_verification_controller');
const middleware = require('./middleware/index.js');

module.exports = (app, passport) => {
  /**
   * Bootstrap
   */
  app.get(
    '/api/bootstrap',
    middleware.isAuthenticated,
    bootstrapController.GET,
  );

  /**
   * Users
   */
  app.get('/api/me', middleware.isAuthenticated, userController.GET);

  /**
   * User verification
   */
  app.post(
    '/api/me/verify',
    middleware.isAuthenticated,
    userVerificationController.POST,
  );

  /**
   * Auth sign in
   */
  app.get('/auth/google', (req, res, next) => {
    authController.signIn(req, res, next, passport);
  });

  /**
   * Auth sign out
   */
  app.get('/auth/sign_out', authController.signOut);

  /**
   * Auth callback
   */
  app.get('/auth/google/callback', (req, res, next) => {
    authController.handleCallback(req, res, next, passport);
  });
};
