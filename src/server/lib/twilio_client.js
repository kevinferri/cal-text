const Application = require('../lib/application');
const client = require('twilio')(
  Application.getConfig('TWILIO_SID'),
  Application.getConfig('TWILIO_AUTH_TOKEN'),
);

module.exports = client;
