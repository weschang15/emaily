const router = require("express").Router();
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

// Use our require login middleware on this exact route
router.use("/api/stripe", requireLogin);

router.post("/api/stripe", async (req, res) => {
  // Create a charge for a fixed amount of $5
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "$5 for 5 emaily credits",
    source: req.body.id
  });

  // Add 5 credits to the current user
  req.user.credits += 5;
  // Save the user
  const user = await req.user.save();
  // Send the updated user back to request
  res.send(user);
});

module.exports = router;
