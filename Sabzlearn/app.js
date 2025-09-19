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
    const newQuery = `INSERT INTO courses VALUES (
    NULL,
    "دوره متخصص پایتون",
    "کپشن تستی برای دوره",
    2000000,
    "لیچ ماب"
  )
    `;
    db.query(newQuery, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(data);
    });
  }
});
