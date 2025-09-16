const http = require("http");
const url = require("url");

const database = {
  users: [
    {
      id: 1,
      username: "mohammad",
      email: "mohammad@gmail.com",
      password: "mohammad123",
    },
    { id: 2, username: "reza", email: "reza@gmail.com", password: "reza456" },
    { id: 3, username: "amir", email: "amir@gmail.com", password: "amir789" },
  ],
};

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const urlParams = url.parse(req.url, true);

    if (urlParams.pathname === "/api/users") {
      const mainUser = database.users.find(
        (user) =>
          user.email.toLowerCase() === urlParams.query.email.toLowerCase()
      );

      if (mainUser) {
        res.write(JSON.stringify(mainUser));
      } else {
        res.write(
          JSON.stringify({
            message: `user with email : (${urlParams.query.email}) is not founded - need register`,
          })
        );
      }
      res.end();
    }
  })
  .listen(3000, () =>
    console.log(`🔥 sablearn.js => server create with sucessfullyed ✔`)
  );
