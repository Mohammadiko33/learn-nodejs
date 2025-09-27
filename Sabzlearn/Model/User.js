const mongoose = require("mongoose");
const Userschema = mongoose.Schema({
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
})
let User = mongoose.model("users", Userschema);

module.exports = User;