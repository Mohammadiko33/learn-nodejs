const fs = require("fs");

// fs.readFile("./docs/blog.txt" , (err , data) => {
//     if (err) console.log(err);
//     console.log(data.toString())
// })

// fs.writeFile("./docs/blog.txt" , "yall nigga las and nas vegas" , () => {
//     console.log("write readed successfully")
// })

// fs.appendFile("./docs/blog.txt" , "follow bas follow bag" , () => {
//     console.log("append wrrite file successfully")
// })

// fs.mkdir("./docs2", (err) => {
//   if (err) console.log(err);
//   console.log("folder created");
// });

// fs.rmdir(".qodo", () => {
//   if (err) console.log(err);
//   console.log("folder deleted");
// });

fs.unlink("./temp.test.tsx" , (err) => {
  if (err) console.log(err);
  console.log("delete file successfully")
})