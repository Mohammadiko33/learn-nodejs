const express = require("express");
const morgan = require("morgan")
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.listen(3000);

// connect to mobogdb 

const dbURl = "mongodb+srv://itswasgoodday-mike:leachmob@mike.ppyzrao.mongodb.net/learn-nodejs?retryWrites=true&w=majority&appName=mike"

// middleware and static files
mongoose.connect(dbURl)
  .then(res => console.log(`🔥 app.js:17 => result is : ${res}`))
  .catch(err => console.log(`🔥 app.js:18 => ${err}`))

app.use(express.static("public"))


// app.use(morgan("tiny"))

app.get("/", (req, res) => {
  res.render("index" , {titleInApp: "home", pageTitle: "home" , blogs})
});

app.use((req , res , next) => {
  console.log(`🔥 app.js:30 => -------------- learn node js --------------`)
  next()
})

app.get("/about", (req, res) => {
   res.render("about" , { titleInApp: "about", pageTitle: "about" })
});

app.get("/blog/new-blog", (req, res) => {
  res.render("createBlog" , { titleInApp: "create a new blog", pageTitle: "create a new blog" })
});

app.use((req , res) => {
  res.status(404).render("notFounded" , { titleInApp: "404", pageTitle: "404" })
})