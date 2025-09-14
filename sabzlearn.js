const http = require("http")

const db = {
    users: ["mohammad" , "amir" , "reza"],
    products: ["apple" , "joice" , "milk"],
}

const server = http.createServer((req , res) => {
    if (req.url === "/api/users"){
        res.write(JSON.stringify(db.users))
        res.end()
    } else if (req.url === "/api/products") {
        res.write(JSON.stringify(db.products))
        res.end()
    } else {
        res.write("oopsy ! 404 api is not defaild")
        res.end()
    }
})

server.listen(3000)

// -------

// const http = require("http")

// const server = http.createServer((req , res) => {
//     console.log(`🔥 Sabzlearn.js:4 => ${req.method}`)
//     console.log(`🔥 Sabzlearn.js:5 => ${req.url}`)
//     res.write(`🔥 Sabzlearn.js:6 => log`)
// })

// server.listen(3000)

// --------

// const os = require("os")

// console.log(os.cpus())
// console.log(os.arch())
// console.log(Math.floor(os.totalmem() / 1_000_000)) // byte
// console.log(Math.floor(os.freemem() / 1_000_000)) // byte

// ---------

// const path = require("path");

// const modelsPathWithModule = path.join(__dirname, "/userProfile");
// const modelsPathWithoutModule = `${__dirname}/userProfile`;
// console.log("modelsPathWithModule : " + modelsPathWithModule);
// console.log("modelsPathWithoutModule : " + modelsPathWithoutModule);

// const modelsPathWithModule2 = path.join(__dirname, "../../public");
// const modelsPathWithoutModule2 = `${__dirname}/../../public`;
// console.log("modelsPathWithModule2 : " + modelsPathWithModule2);
// console.log("modelsPathWithoutModule2 : " + modelsPathWithoutModule2);