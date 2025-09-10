const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.listen(3000);

app.get("/", (req, res) => {
  res.render("index" , {titleInApp: "home"})
});

app.get("/about", (req, res) => {
   res.render("about" , { titleInApp: "about" })
});

app.get("/blog/new-blog", (req, res) => {
  res.render("createBlog" , { titleInApp: "create a new blog" })
});

app.use((req , res) => {
  res.status(404).render("notFounded" , { titleInApp: "404" })
})