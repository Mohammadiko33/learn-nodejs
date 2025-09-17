const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();

// app.use(express.json({ extended: false }));
app.use(cors())
app.use(bodyParser.json())

const users = [
  { id: "1", email: "mohammad@gmail.com", password: "123456" },
  { id: "2", email: "reza@gmail.com", password: "456789" },
  { id: "3", email: "amir@gmail.com", password: "789123" },
];

app.post("/api/users/new-user", (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.send(JSON.stringify(users));
});

app.get("api/users" , cors() , (req , res) => {
  res.send(JSON.stringify(users))
})

app.listen(3000);