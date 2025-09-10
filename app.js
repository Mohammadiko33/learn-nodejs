const express = require("express");

const blogs = [
  {title: "title 1" , caption: "lorem ipsum is a fake title 1"},
  {title: "title 2" , caption: "lorem ipsum is a fake title 2"},
  {title: "title 3" , caption: "lorem ipsum is a fake title 3"}
]

const app = express();

app.set("view engine", "ejs");

app.listen(3000);

app.use((req , res , next) => {
  console.log(`new request was made :`)
  console.log(`host: ` , req.hostname)
  console.log(`path: ` , req.path)
  console.log(`method: ` , req.method)
  next()
})

app.get("/", (req, res) => {
  res.render("index" , {titleInApp: "home", pageTitle: "home" , blogs})
});

app.use((req , res , next) => {
  console.log(`🔥 app.js:28 => -------------- learn node js --------------`)
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