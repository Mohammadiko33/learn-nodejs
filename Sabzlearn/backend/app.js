const http = require("http");
const url = require("url");

const users = [
  { id: 1, email: "mohammad@gmail.com", password: 123123123 },
  { id: 2, email: "reza@gmail.com", password: 456456456 },
  { id: 3, email: "amir@gmail.com", password: 789789789 },
];

http
  .createServer((req, res) => {
    console.log(req.url);
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const usermail = myUrl.searchParams.get("email");
    const password = myUrl.searchParams.get("pass");
    console.log(usermail, password);
    const findDataFromEmail = users.find(user => user.email === usermail)
    console.log(findDataFromEmail)
    if (findDataFromEmail){
      const mainUser = users.find(user => user.password === password)
      console.log(mainUser)
      if (mainUser){
        res.sendDate(mainUser)
      }
    }
    res.end();
  })
  .listen(3000, () => {
    console.log(`🔥 server runned in port 3000`);
  });
