const http = require("http")

const server = http.createServer((req , res) => console.log("request made"))

server.listen(3000 , () => {
    console.log("server created successfully in port 3000")
})