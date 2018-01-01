module.exports = (req, res, next) => {
  // Ensure that a user exists otherwise end request early with error message
  if (!req.user) {
    // Send a forbidden status code
    return res.status(401).send({ error: "You must be logged in!" });
  }

  next();
};
