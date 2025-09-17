const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// app.use(express.json({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const users = [
  { id: "1", username: "amir", email: "amir@gmail.com", password: "789123" },
];

app.post("/api/users/new-user", (req, res) => {
  const qbody = req.body;
  const isItNameIndb = users.some((user) => user.username === qbody.username);
  const isItEmailIndb = users.some((user) => user.username === qbody.username);
  if (isItNameIndb) {
    res.send({ message: "this userName is in database" });
  } else if (isItEmailIndb) {
    res.send({ message: "this email is in database" });
  } else {
    const newUser = {
      id: (users.length + 1).toString(),
      ...qbody,
    };
    users.push(newUser);
    res.send(JSON.stringify(users));
  }
});

app.get("api/users", cors(), (req, res) => {
  res.send(JSON.stringify(users));
});

app.listen(3000);
