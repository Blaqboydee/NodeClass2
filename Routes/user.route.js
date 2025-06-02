const express = require("express");

const userrouter = express.Router()
const {getLandingPage, getSignup, getLogin, Signup, Login} = require("../Controllers/user.controller")

userrouter.get("/", getLandingPage)


userrouter.get("/signup", getSignup)


userrouter.get("/login" , getLogin)


userrouter.post("/user/signup", Signup)

userrouter.post("/user/login", Login)


module.exports = userrouter