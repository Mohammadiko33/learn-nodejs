const fs = require("fs")

fs.readFile("./docs/blog.txt" , (err , data) => {
    if (err) console.log(err);
    console.log(data) // <Buffer 73 6f 20 73 74 6f 70 20 74 68 65 20 6e 6f 7a 69 20 74 68 61 74 73 20 6c 69 66 65 20 73 68 69 20 72 65 64 20 72 6f 7a 7a 69>
})