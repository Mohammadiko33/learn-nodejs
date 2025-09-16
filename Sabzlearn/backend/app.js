const http = require("http");

const users = [
  { id: 1, email: "mohammad@gmail.com", password: "123456" },
  { id: 2, email: "reza@gmail.com", password: "456789" },
  { id: 3, email: "amir@gmail.com", password: "789123" },
];

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.url.startsWith("/api/users")) {
      if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
      }

      console.log(req.url);
      const myUrl = new URL(req.url, `http://${req.headers.host}`);
      const usermail = myUrl.searchParams.get("email");
      const password = myUrl.searchParams.get("pass");

      const findDataFromEmail = users.find((user) => user.email.toLowerCase() === usermail.toLowerCase());
      if (findDataFromEmail) {
        const mainUser = users.find((user) => user.password === password);
        if (mainUser) {
          res.write(JSON.stringify({ success: true, user: mainUser }));
        } else {
          res.write(
            JSON.stringify({
              success: false,
              message: "password is wrong, are you forgot your password ?",
            })
          );
        }
      } else {
        res.write(
          JSON.stringify({
            success: false,
            message: "Email Not founded You need Register first",
          })
        );
      }
    } else {
        res.write(
          JSON.stringify({
            success: false,
            message: "404 , api is not founded",
          })
        );
    }
    res.end();
  })
  .listen(3000, () => {
    console.log(`🔥 server runned in port 3000`);
  });
