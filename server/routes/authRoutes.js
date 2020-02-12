const express = require('express');
const router = express.Router();
const passport = require('passport')
const bcrypt = require("bcrypt")
const db = require('../../database/database.js')

router.post('/api/register', async (req, res) => {
  const {name, email, password} = req.body;

  try {
    //async fn that hashes password, 2nd arg = how secure
    const hashedPassword = await bcrypt.hash(password, 10)

    await db.none(`INSERT INTO users (name, email, hashpass) VALUES ($1, $2, $3)`, 
    [name, email, hashedPassword])
    res.send('success')
  } catch (err) {
    console.log(err.detail)
    res.status(500).send({message:'Email already exists'})
  }
})

router.post('/api/login', (req, res, next) => {
  //info comes from passport-config flash message
  passport.authenticate('local', (err, user, info) => {
    if (err) {  return res.sendStatus(500); }
    if (!user) { return res.status(500).send(info); }

    //login and redirect
    req.logIn(user, function(err) {
      if (err) { return res.sendStatus(500); }
      return res.send('Successfully logged in')
    });
  })(req, res, next);
});

router.get('/api/current_user', (req, res) => {
  //destructure to not include hashpassword
  const {id, name, email} = req.user
  res.send({id, name, email})
})

router.get('/api/logout', (req, res) => {
  //passport fn that clears session 
  req.logOut();
  req.session = null
  res.redirect('/login')
})


module.exports = router