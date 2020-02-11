const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initiliaze(passport) {
  const authenticateUser = async (email, passport, done) => {
    //fn to obtail user, obtain from model
    const user = getUserByEmail(email)

    if (user === null) {
      //1st param = the error
      //2nd param = user found
      //3rd param = message
      return done(null, false, {message: 'No user with that email'})
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, {message: 'Password incorrect'})
      }
    } catch (err) {
      return done(err)
    }
  }

  passport.use(new LocalStrategy({
    //what is uername called? default is username
    usernameField: 'email'
  }, 
  //fn called that authenticates the user
  authenticateUser
  ))


  //serialize user to store inside
  passport.serializeUser((user, done) => {

  })

  passport.deserializeUser((id, done) => {

  })
}


module.exports = initiliaze;