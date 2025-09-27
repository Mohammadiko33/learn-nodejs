const app = require("express")();
const cors = require("cors")
const parser = require("body-parser");
const userapp = require("./controls/user");

app.use(parser.json())
app.use(cors())
app.use("/users" , userapp);

app.listen(3000 , () => console.log(`🔥 server run in port 3000 waiting for requests`))