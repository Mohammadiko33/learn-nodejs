const fs = require("fs")

// fs.readFile("./docs/blog.txt" , (err , data) => {
//     if (err) console.log(err);
//     console.log(data.toString())
// })

fs.writeFile("./docs/blog.txt" , "yall nigga las and nas vegas" , () => {
    console.log("write readed successfully")
})