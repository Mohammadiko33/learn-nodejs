const ex = require("express");
const parser = require("body-parser");
const mongoose = require("mongoose");
const User = require("../Model/User");
mongoose.connect("mongodb://localhost:27017/leachmob");

ex().use(parser.json());
const userapp = ex.Router();

let newUser = null;
userapp.post("/", (req, res) => {
  newUser = req.body;
  if (Boolean(newUser) && Object.keys(newUser).length) {
    const insertedUser = new User(newUser);
    insertedUser.save().then((err) => console.log(err));
    res.json({ message: `it's ok` });
  } else {
    res.json({ message: `it's not ok` });
  }
});

module.exports = userapp;