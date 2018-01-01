const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = require("../models/User");

/**
 * Serialize the user that is passed to passport and store in session
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * Return an instance of the User model to passport whose ID is stored in the session is stored in
 * the DB
 */
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

/**
 * Enable google oauth
 *
 * Check if user already exists in database, if they do, then return that user to passport otherwise
 * create a new user with their google ID saved in the DB and return that new user to passport
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
