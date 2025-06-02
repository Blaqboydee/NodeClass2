const express = require("express");
const app = express();
require("ejs");
const mongoose = require("mongoose")
require("dotenv").config()
const Connect = require("./Dbconfig/Db.connect")
const userrouter = require("./Routes/user.route");
const todorouter = require("./Routes/todo.route")





app.set("view engine", "ejs")
app.use(express.urlencoded())  //Middleware, which accepts the type of information being sent. Without this, req.body will be undefined.
app.use("/", userrouter)
app.use("/todo", todorouter)




const port = 3000;

app.listen( port, ()=>{
  console.log(`app is running on port ${port}`)
})

Connect()