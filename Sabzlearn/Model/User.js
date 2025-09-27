const mongoose = require("mongoose");
let User = mongoose.model("users", {
  username: {
    type: String,
    required: true,
    minLength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 13,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    trim: true,
  },
});

module.exports = User;