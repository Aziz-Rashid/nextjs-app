function auth(req, res, next) {
  // Check for user in session
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({ msg: "not authorized" });
  }
}

module.exports = auth;
