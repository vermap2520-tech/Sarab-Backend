const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone_no: {
    type: Number,
  },
  gender: {
    type: String,
  },
  location: {
    type: String,
  },
  dob: {
    type: String,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
