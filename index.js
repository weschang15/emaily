const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

// require passport configuration
require("./services/passport");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

// use body-parser to give our routes access to any incoming request body
app.use(bodyParser.json());

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
// require routes for billing process
app.use(require("./routes/billing"));
// require routes for surveys
app.use(require("./routes/survey"));

// ensure that express serves our react build bundle in production
if (process.env.NODE_ENV === "production") {
  // serve static assests
  app.use(express.static("client/build"));

  /**
   *  serve our client-side index.html file if express doesn't find an appropriate route handler for the
   *  current request
   */
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
