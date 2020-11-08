const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const sanitize = require("mongo-sanitize");

const User = require("../models/user");

// Passport local strategy configuration: email and password login
passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    // Sanitize user input first
    email = sanitize(email);
    password = sanitize(password);

    // Check if user exists and get user data from database
    User.findOne({ email }).then((user, err) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }

      // Validate password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) return done(null, false);
        return done(null, user);
      });
    });
  })
);

// Get User ID and set it in session cookie
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

// Get User data from ID in the session cookie
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
