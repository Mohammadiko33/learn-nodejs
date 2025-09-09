const fileSystem = require("fs")

const readStream = fileSystem.createReadStream("./blog.txt")

readStream.on("data" , (buffer) => {
    console.log("new buffer")
    console.log(buffer)
})