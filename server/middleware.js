module.exports.isAuthenticated = (req, res, next) => {
  //built in passport fn that checks if user is authenticated
  if (req.isAuthenticated()) {
    return next() 
  } 

  res.redirect('/login')
}

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  } 

  next();
}