const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);

  path = "./vue/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200
      break;
    default:
      path += "notFounded.html";
      res.statusCode = 404
      break;
  }

  res.setHeader("Content-Type", "text/html");

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // res.write(data)
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("server created successfully in port 3000");
});