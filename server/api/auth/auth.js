const express = require("express");
const router = express.Router();
const checkauth = require("../../middleware/checkauth");

const User = require("../../models/user");

// @route GET api/auth/logout
// @desc    Logout
// @access  Private
router.get("/logout", checkauth, (req, res) => {
  try {
    // Change status to offline
    const { username } = req.user;
    User.findOne({ username }).then((user) => {
      user.isOnline = false;
      user.save();
    });

    // Clean User ID from cookie and destroy session
    req.logout();
    req.session.destroy(() => res.redirect("/"));
  } catch (err) {
    res.status(400).send("Bad request");
  }
});

module.exports = router;
