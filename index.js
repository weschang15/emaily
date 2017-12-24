const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

// require user models for use with mongoose (declared early so that passport can use model)
// require("./models/User");
// require passport configuration
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.createConnection(keys.mongoURI);

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
require("./routes/auth")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
