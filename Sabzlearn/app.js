const app = require("express")();
const cors = require("cors");
const parser = require("body-parser");
const db = require("./db.connect");
app.use(cors());
app.use(parser.json());
db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log(`🎁 database connect with successfully`);
  }
});
app.get("/users", (req, res) => {
  const qget = "SELECT id, username, email , password FROM users";
  let rows = []
  db.query(qget, (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      rows = data
      if (rows.length) {
        res.json(rows);
      } else {
        res.json({ message: "no data" });
      }
    }
  });
});
app.post("/users", (req, res) => {
  const { username, email, password } = req.body;
  const qpost = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(qpost, [username, email, password], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB insert error" });
    }
    res.status(201).json({
      message: "user created successfully",
      id: data.insertId,
    });
  });
});

app.get("/users/:userId", (req, res) => {
  const paramId = Number(req.params.userId);
  const qgetById =
    "SELECT id, username, email, password FROM users WHERE id = ?";
  db.query(qgetById, [paramId], (err, data) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (data.length === 0)
      return res.status(404).json({ message: `no user with id ${paramId}` });
    res.json(data[0]);
  });
});

app.delete("/users/:userId", (req, res) => {
  const paramId = Number(req.params.userId);
  const qdelete = "DELETE FROM users WHERE id = ?";
  db.query(qdelete, [paramId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "DB delete error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `no user with id ${paramId}` });
    }
    res.json({ message: "delete user successfully" });
  });
});


app.put("/users/:userId", (req, res) => {
  const paramId = Number(req.params.userId);
  const { username, email, password } = req.body;
  const qupdate =
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
  db.query(qupdate, [username, email, password, paramId], (err, result) => {
    if (err) return res.status(500).json({ message: "DB update error" });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: `no user with id ${paramId}` });
    res.json({ message: "user updated successfully" });
  });
});

app.listen(3000, () => console.log(`🔥 server tun on port 3000`));
