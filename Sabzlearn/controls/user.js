const ex = require("express")
const parser = require("body-parser");
ex().use(parser.json());
const userapp = ex.Router()

userapp.post("/" , (req , res) => {
    res.json(req.body)
})

module.exports = userapp;