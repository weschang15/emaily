const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Survey = require("../models/Survey");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

// require custom middleware to require credits for survey routes
router.use("/api/surveys", requireLogin, requireCredits);

router.post("/api/surveys", async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    body,
    subject,
    recipients: recipients.split(",").map(email => ({
      email: email.trim()
    })),
    _user: req.user.id,
    dateSent: Date.now()
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));
  await mailer.send();
  await survey.save();

  try {
    // Update the amount of credits for this particular user
    req.user.credits -= 1;
    // Store the updated user into variable
    const user = await req.user.save();
    // Send back the updated user to be used throughout our app
    res.send(user);
  } catch (error) {
    // send back an unprocessesable data response
    res.status(422).send(error);
  }
});

router.get("/api/feedback", (req, res) => {
  res.send("Thanks for your response, my friend! 🙃");
});

module.exports = router;
