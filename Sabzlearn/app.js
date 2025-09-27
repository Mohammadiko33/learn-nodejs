const app = require("express")()
const mongose = require("mongoose")
const cors = require("cors");
app.use(cors());
const userapp = require("./controls/user")
mongose.connect("mongodb://localhost:27017/leachmob")

app.use("/users" , userapp)

app.listen(3000 , () => console.log("server run in port 3000 😊 👍"))