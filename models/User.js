const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String
});

module.exports = mongoose.model("user", userSchema);
