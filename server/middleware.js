function checkAuthenticated(req, res, next) {
  //built in passport fn that checks if user is authenticated
  if (req.isAuthenticated()) {
    return next() 
  } 

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/')
  } 

  next();
}