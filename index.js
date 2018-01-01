const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

// require passport configuration
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

// allow express to make use of cookie sessions with cookie-session middleware and encrypt cookie with key
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// require google auth routes and pass express server instance to routes
app.use(require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
