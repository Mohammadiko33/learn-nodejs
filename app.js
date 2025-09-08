const fs = require("fs")

fs.readFile("./docs/blog.txt" , (err , data) => {
    if (err) console.log(err);
    console.log(data.toString()) // so stop the nozi thats life shi red rozzi
})