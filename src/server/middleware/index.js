const ErrorResponse = require('../responses/error_response');
const jwt = require('jsonwebtoken');
const Application = require('../lib/application');

const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json(new ErrorResponse(403));
  }

  return next();
};

const isValidJwt = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(403).json(new ErrorResponse(403, 'No JWT was provided.'));
  }

  const splitted = authorization.split(' ');
  const type = splitted[0].toLowerCase();
  const token = splitted[1];

  if (type !== 'jwt') {
    return res
      .status(403)
      .json(
        new ErrorResponse(
          403,
          'Invalid format for Authorizatio header. Must be in the format of jwt <token>.',
        ),
      );
  }

  try {
    jwt.verify(token, Application.getConfig('JWT_USER_SECRET'));
  } catch (err) {
    return res.status(403).json(new ErrorResponse(403, 'Invalid JWT.'));
  }

  return next();
};

module.exports = {
  isAuthenticated,
  isValidJwt,
};
