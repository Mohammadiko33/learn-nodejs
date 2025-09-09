const express = require("express");

const app = express();
const fileOption = { root: __dirname };

app.listen(3000);

app.get("/", (req, res) => {
  res.sendFile("./vue/index.html", fileOption);
});

app.get("/about", (req, res) => {
  res.sendFile("./vue/about.html", fileOption);
});


app.get("/about-us", (req, res) => {
  res.redirect("/about")
});

app.use((req , res) => {
  res.sendFile("./vue/notFounded.html" , fileOption)
})