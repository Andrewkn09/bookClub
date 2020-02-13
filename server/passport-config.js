const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../database/database.js');

function initilizePassport() {
  //email and passpord gets obtained from req.body
  const authenticateUser = async (email, password, done) => {
    try {
      //fn to obtail user object, obtain from model, need user to pass serialize again and compare hash with hashpass
      const user = await db.oneOrNone(`SELECT * FROM users WHERE email = $1`, [
        email,
      ]);

      //check if user exists
      if (!user) {
        //1st param = the error, 2nd param = user found, 3rd param = message, appears as info when calling passport.authenticate
        return done(null, false, { message: 'No user with that email' });
      }

      //check if password matches
      if (!(await bcrypt.compare(password, user.hashpass))) {
        return done(null, false, { message: 'Password incorrect' });
      }

      //suppllies passport with user to log in when calling passport.authenticate
      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        //what is uername called? default is username
        usernameField: 'email',
      },
      //fn called that authenticates the user that takes in usernameField, password, done
      authenticateUser
    )
  );

  //serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  //deserialize for use in req.use
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.one(`SELECT * FROM users WHERE id = $1`, [id]);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  });
}

module.exports = initilizePassport;
