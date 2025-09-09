const fileSystem = require("fs")

const readStream = fileSystem.createReadStream("./blog.txt" , {encoding: "utf8"})
const wrriteStream = fileSystem.createWriteStream("./result.tex")

readStream.on("data" , (buffer) => {
    // Read stream
    console.log("new buffer")
    console.log(buffer)
    // wrrite stream

    wrriteStream.write("\n--------------- new buffer ---------------\n")
    wrriteStream.write(buffer)
})