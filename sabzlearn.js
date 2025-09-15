const http = require("http");
const url = require("url");

const users = [
  { id: 1, name: "mohammad", age: 19 },
  { id: 2, name: "reza", age: 18 },
  { id: 3, name: "amir", age: 17 },
];

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/users")){
    const query = url.parse(req.url, true).query;
    const result = users.find(user => user.name === query.name)
    res.write(JSON.stringify(result))
    res.end()
  } else {
    res.write("404 api not found")
    res.end()
  }
});

server.listen(3000, () => {
  console.log(`🔥 Sabzlearn.js => server run in port 3000`);
});