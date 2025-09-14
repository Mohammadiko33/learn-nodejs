const os = require("os")

console.log(os.cpus())
console.log(os.arch())
console.log(Math.floor(os.totalmem() / 1_000_000)) // byte
console.log(Math.floor(os.freemem() / 1_000_000)) // byte

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