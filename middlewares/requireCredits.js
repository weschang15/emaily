module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res
      .status(403)
      .send({ error: "You must have at least 1 credit to create a survey!" });
  }

  next();
};
