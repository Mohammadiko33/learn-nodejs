const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "leachmob",
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`🔥 app.js:14 => connect database with successfully`);
  }
});