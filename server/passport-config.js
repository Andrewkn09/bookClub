const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('../database/database.js')

function initiliaze(passport) {
  const authenticateUser = async (email, password, done) => {
    try {
      //fn to obtail user object, obtain from model, need user to pass serialize again and compare hash with hashpass
      const user = await db.one(`SELECT * FROM users WHERE email = $1`, [email]).catch(err => {
        console.log(err)
      })
      
      if (!user) {
        //1st param = the error
        //2nd param = user found
        //3rd param = message
        return done(null, false, {message: 'No user with that email'})
      }

      if (await bcrypt.compare(password, user.hashpass)) {
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
  //fn called that authenticates the user that takes in usernameField, password, done
  authenticateUser
  ))


  //serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  //deserialize for use in req.use
  passport.deserializeUser(async (id, done) => {
    const user = await db.one(`SELECT * FROM users WHERE id = $1`, [id])

    return done(null, user)
  })
}


module.exports = initiliaze;