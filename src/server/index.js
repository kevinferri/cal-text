const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const Application = require('./lib/application');
const sessionConfig = {
  name: Application.getConfig('SESSION_NAME'),
  secret: Application.getConfig('SESSION_SECRET'),
  cookie: {
    maxAge: 3600000 * 24 * 30,
  },
  resave: true,
  saveUninitialized: true,
  rolling: true,
  store: new MongoDBStore({
    uri: Application.getConfig('DB_URL'),
    collection: 'user_sessions',
  }),
};

/**
 * Connect to database
 */
mongoose.connect(Application.getConfig('DB_URL'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * Parse application/json
 */
app.use(bodyParser.json());

/**
 * Set up passport
 */
require('./lib/passport')(passport);
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Set up routes
 */
require('./router.js')(app, passport);

/**
 * Serve correct react app
 */
app.use(express.static(path.join(__dirname, './../../')));
app.use((req, res) => {
  const serverView = req.user ? 'logged_in' : 'logged_out';
  res.sendFile(
    path.join(__dirname, `./../../src/server/views/${serverView}.html`),
  );
});

/**
 * Start the server
 */
app.listen(port, () => {
  console.info(`🚀  CalText started on port ${port}`);
});
