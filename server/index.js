if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const cookieSession = require('cookie-session');
const passport = require('passport');
//initialize passport config
require('./passport-config.js')();

const authRoutes = require('./routes/authRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');

// const session = require('express-session')
// app.use(session({
//   //key that is kept secret that encrypts information, want to be random
//   secret:process.env.SESSION_SECRET,
//   //should we resave session variables if nothing is changed
//   resave: false,
//   //do you want to save empty value in session if there's no value
//   saveUninitialized: false
// }))

//persist session on refresh
app.use(
  cookieSession({
    name: 'bookSession',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
  })
);

//passport fn that sets up basics need to start
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port localhost:${PORT}`);
});
