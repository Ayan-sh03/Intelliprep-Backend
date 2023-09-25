const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name Required"],
  },
  email: {
    type: String,
    required: [true, "Need mail"],
  },
  password: {
    type: String,
    required: [true, "Need Password"],
  },
});
module.exports = mongoose.model("User", userSchema);
