const express = require("express");
const app = express();
require("ejs");
const mongoose = require("mongoose")
require("dotenv").config()
const Connect = require("./Dbconfig/Db.connect")
const usermodel = require("./Models/user.model")
const todomodel = require("./Models/todo.model");
const userrouter = require("./Routes/user.route");




app.set("view engine", "ejs")
app.use(express.urlencoded())  //Middleware, which accepts the type of information being sent. Without this, req.body will be undefined.
app.use("/", userrouter)


let userarray = [];
let username;
let useremail;

let message;
let name = "Eriifeoluwasimi";
let gender = "Female"


app.get("/user", (req, res)=>{
    res.send("Hello, User")
  })




app.get("/login",(req, res)=>{
  res.render('login')
})


app.post("/user/login", async(req,res)=>{

  try {
     console.log(req.body)
     const {email, password} = req.body
     const existuser = await usermodel.findOne({email})
     console.log(existuser);

     if (existuser && existuser.password === password) {
        console.log(`Hello ${existuser.username}`);
        res.redirect("/todo")
     }else{
      console.log("User not found");
      res.redirect("/login")
     }
     
  } catch (error) {
    console.log(error);
    res.redirect("/login")
  }
 

})




app.get("/html", (req, res)=>{
   res.sendFile(__dirname + "/index.html")
})

app.post("/user/signup", async (req, res)=>{
  console.log(req.body);
  
  // const {username, email, password} = req.body

  // if (!username || !email || !password) {
  //     console.log("All fields are required");
  //     message = "All fields are required"
  //     return res.redirect("/signup")
  // }


  try {
    const user = await usermodel.create(req.body)
   console.log(user);
   res.redirect("/login")

  } catch (error) {


      if (error.message.includes("E11000 duplicate key error collection")) {
      message= "Email already exists"
       console.log(error.message);
       return res.redirect("/signup")
    } 

       if (error.message.includes("Path `email` is required")) {
      message= "Email is required"
       console.log(error.message);
       return res.redirect("/signup")
    } 

       if (error.message.includes("Path `username` is required")) {
      message= "Username is required"
       console.log(error.message);
       return res.redirect("/signup")
    } 

   if (error.message.includes("Path `password` is required")) {
      message= "Password is required"
       console.log(error.message);
       return res.redirect("/signup")
    } 

    console.log(error.message);
    
  }

})



app.get("/todo", async (req, res)=>{
    const  todos = await todomodel.find();
    res.render("todo", {todos, message})
})


app.post("/user/todo", async(req, res)=>{
 try {
   console.log(req.body);
  const todo = await todomodel.create(req.body)
  res.redirect("/todo")
  
 } catch (error) {
  
       if (error.message.includes("Path `title` is required")) {
      message= "title is required"
       console.log(error.message);
       return res.redirect("/todo")
    } 



   if (error.message.includes("Path `content` is required")) {
      message= "content is required"
       console.log(error.message);
       return res.redirect("/todo")
    } 

    console.log(error.message);
    
  
 }

})


app.post("/todo/delete", async(req, res) =>{
    console.log(req.body.id);
    const id = req.body.id;
    await todomodel.findByIdAndDelete(id); 
    res.redirect("/todo")

})

app.get("/todo/edit/:id", async(req, res)=>{
   const _id = req.params.id;
   console.log(_id);
   const oneToEdit = await todomodel.findOne({ _id })
   console.log(oneToEdit);
  res.render("edit", {_id, oneToEdit})
})


app.post("/update", async (req, res)=>{
    console.log(req.body);
    const title = req.body.title;
    const content = req.body.content;
    const _id = req.body.editIndex
    await todomodel.findByIdAndUpdate(_id, { title, content });
    res.redirect("/todo")
})



const port = 3000;

app.listen( port, ()=>{
  console.log(`app is running on port ${port}`)
})

Connect()