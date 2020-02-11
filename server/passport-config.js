const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
//TODO: require db

function initiliaze(passport) {
  const authenticateUser = async (email, passport, done) => {
    //fn to obtail user object, obtain from model
    //TODO: make query to obtain user object with email
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


  //serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  //deserialize for use in req.use
  passport.deserializeUser((id, done) => {
    //TODO: make query to obtain user object with id
    return done(null, getUserById(id))
  })
}


module.exports = initiliaze;