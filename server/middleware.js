module.exports.isAuthenticated = (req, res, next) => {
  //built in passport fn that checks if user is authenticated
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(500).send({ message: 'Please log in' });
};

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  next();
};
