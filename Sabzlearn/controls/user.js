const ex = require("express");
const parser = require("body-parser");
const mongoose = require("mongoose");
const User = require("../Model/User");
mongoose.connect("mongodb://localhost:27017/leachmob");

ex().use(parser.json());
const userapp = ex.Router();

userapp.post("/", (req, res) => {
  let newUser = req.body;
  if (Boolean(newUser) && Object.keys(newUser).length) {
    const insertedUser = new User(newUser);
    insertedUser.save().then((err) => console.log(err));
    res.json({ message: `it's ok` });
  } else {
    res.json({ message: `it's not ok` });
  }
});

userapp.delete("/:userId", (req, res) => {
  // wave 1 , for every if
  // User.findOneAndDelete({ _id: req.params.userId })
  //   .then((result) => {
  //     res.send({ message: `🔥 user deleted successfully` });
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     res.send({ message: `🔥 user deleted it feild` });
  //     console.log(err);
  //   });
  // wave 2 , for just id
    User.findByIdAndDelete( req.params.userId )
    .then((result) => {
      res.send({ message: `🔥 user deleted successfully` });
      console.log(result);
    })
    .catch((err) => {
      res.send({ message: `🔥 user deleted it feild` });
      console.log(err);
    });
});

module.exports = userapp;
