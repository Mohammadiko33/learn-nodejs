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

userapp.get("/:userId" , (req , res) => {
    // wave 1 , for every if
  User.find({ _id: req.params.userId })
    // .then((result) => {
    //   console.log(result);
    //   res.json(result);
    // })
    // .catch((err) => {
    //   res.send({ message: `🔥 you have error in get user with id ${req.params.userId}` });
    //   console.log(err);
    // });
  // wave 2 , for just id
    User.findById( req.params.userId )
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.send({ message: `🔥 you have error in get user with id ${req.params.userId}` });
      console.log(err);
    });
})
userapp.get("/" , (req , res) => {
    User.find({})
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      res.send({ message: `🔥 you have error in get users` });
      console.log(err);
    });
})

userapp.put("/:userId" , (req , res) => {
    // wave 1 , for every if
  // User.findOneAndUpdate({ _id: req.params.userId } , req.body)
  //   .then((result) => {
  //     res.send({ message: `🔥 user updated successfully` });
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     res.send({ message: `🔥 user updated it feild` });
  //     console.log(err);
  //   });
  // wave 2 , for just id
  console.log(req.body)
    User.findByIdAndUpdate( req.params.userId , req.body )
    .then((result) => {
      res.send({ message: `🔥 user updated successfully` });
      console.log(result);
    })
    .catch((err) => {
      res.send({ message: `🔥 user updated it feild` });
      console.log(err);
    });
})

module.exports = userapp;
