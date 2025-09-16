const express = require("express")

const app = express()

const users = [
  { id: "1", email: "mohammad@gmail.com", password: "123456" },
  { id: "2", email: "reza@gmail.com", password: "456789" },
  { id: "3", email: "amir@gmail.com", password: "789123" },
];

app.get("/api/users/:userId" , (req , res) => {
    const findUser = users.find(user => user.id === req.params.userId)
    res.send(findUser)
})

app.listen(3000)