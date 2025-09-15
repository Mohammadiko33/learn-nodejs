const http = require("http");
const url = require("url");

const db = {
  users: [
    { id: 1, name: "mohammad", age: 19 },
    { id: 2, name: "amir", age: 18 },
    { id: 3, name: "reza", age: 17 },
  ],
};

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;

  if (req.url.startsWith("/api/users")) {
    const userObj = db.users.find((user) => user.name === query.name);

    if (userObj) {
      res.write(JSON.stringify(userObj));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("User not found");
    }
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// http://localhost:3000/api/users?name="mohammad"

// -------

// const http = require("http")

// const server = http.createServer((req , res) => {
//     console.log(`🔥 Sabzlearn.js:4 => ${req.method}`)
//     console.log(`🔥 Sabzlearn.js:5 => ${req.url}`)
//     res.write(`🔥 Sabzlearn.js:6 => log`)
// })

// server.listen(3000)

// --------

// const os = require("os")

// console.log(os.cpus())
// console.log(os.arch())
// console.log(Math.floor(os.totalmem() / 1_000_000)) // byte
// console.log(Math.floor(os.freemem() / 1_000_000)) // byte

// ---------

// const path = require("path");

// const modelsPathWithModule = path.join(__dirname, "/userProfile");
// const modelsPathWithoutModule = `${__dirname}/userProfile`;
// console.log("modelsPathWithModule : " + modelsPathWithModule);
// console.log("modelsPathWithoutModule : " + modelsPathWithoutModule);

// const modelsPathWithModule2 = path.join(__dirname, "../../public");
// const modelsPathWithoutModule2 = `${__dirname}/../../public`;
// console.log("modelsPathWithModule2 : " + modelsPathWithModule2);
// console.log("modelsPathWithoutModule2 : " + modelsPathWithoutModule2);
