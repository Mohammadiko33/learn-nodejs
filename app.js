const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);

  res.setHeader("Content-Type", "text/html");

  fs.readFile("./vue/index.html", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // res.write(data)
      res.end(data)
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("server created successfully in port 3000");
});