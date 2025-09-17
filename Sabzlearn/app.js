const express = require("express")

const app = express()

app.use(express.json({ extended: false }))

const users = [
  { id: "1", email: "mohammad@gmail.com", password: "123456" },
  { id: "2", email: "reza@gmail.com", password: "456789" },
  { id: "3", email: "amir@gmail.com", password: "789123" },
];

app.post("/api/users/new-user" , (req , res) => {
console.log(req.body)
})

app.listen(3000)