const express = require("express");
const userrouter = express.Router()
const {getLandingPage, getSignup} = require("../Controllers/user.contoller")

userrouter.get("/", getLandingPage)


userrouter.get("/signup", getSignup)


module.exports = userrouter