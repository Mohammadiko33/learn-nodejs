const http = require("http")

const server = http.createServer((req , res) => {
    console.log(req.url)
    console.log(req.method)

    res.setHeader("Content-Type" , "text/html")
    
    // res.write("<head> <script src='./script.js' defer></script> </head>")
    res.write("<h1>Hello i'm in course node js</h1>")
    res.write("<p>this is episode 16</p>")
})

server.listen(3000 , "localhost" , () => {
    console.log("server created successfully in port 3000")
})