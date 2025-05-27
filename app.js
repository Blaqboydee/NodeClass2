const express = require("express");
const app = express();
require("ejs");
const mongoose = require("mongoose")



let name = "Eriifeoluwasimi";
let gender = "Female"
app.set("view engine", "ejs")
app.use(express.urlencoded())  //Middleware, which accepts the type of information being sent. Without this, req.body will be undefined.

let userarray = [];
let todos = [];
let username;
let useremail;

let message;



const userschema = mongoose.Schema({
   username:{type:String, required:true},
   email:{type:String, required:true, unique:true},
   password:{type:String, required:true}
})


const todoschema = mongoose.Schema({
  title:{type:String, required:true},
  content:{type:String, required:true}
})

const todomodel = mongoose.model("todo_collections", todoschema)

const usermodel = mongoose.model("user_collectionss", userschema)

app.get("/user", (req, res)=>{
    res.send("Hello, User")
  })

app.get("/", (req, res)=>{
  res.render("index", {name, gender})
})

app.get("/signup", (req, res) => {
 res.render("signup", {message})
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
    todos = await todomodel.find();
    res.render("todo", {todos, message})
})


app.post("/user/todo", async(req, res)=>{
 try {
   console.log(req.body);
  const todo = await todomodel.create(req.body)
  console.log(todo);
  todos = await todomodel.find()
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
    console.log(req.body.index);
    const indexToDelete = req.body.index;
    await todomodel.findByIdAndDelete(todos[indexToDelete].id); 

    todos = await todomodel.find()
    res.redirect("/todo")

})

app.get("/todo/edit/:index",(req, res)=>{
   let indexToEdit = req.params.index;
   console.log(indexToEdit);
  
  res.render("edit", {todos, indexToEdit})
})


app.post("/update", async (req, res)=>{
    console.log(req.body);
    const title = req.body.title;
    const content = req.body.content;
    const editIndex = req.body.editIndex


    await todomodel.findByIdAndUpdate(todos[editIndex].id, { title, content });
    todos = await todomodel.find()
    res.redirect("/todo")
})


const uri = "mongodb+srv://adeoluwaadegoke05:dee05folly@cluster0.fqkxyrk.mongodb.net/NodeAgain?retryWrites=true&w=majority&appName=Cluster0"
const Connect = async () => {
    try {
      const connection = await mongoose.connect(uri);
      if (connection) {
        console.log("Database connected successfully");
      }
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  };

  Connect();



const port = 3000;

app.listen( port, ()=>{
  console.log(`app is running on port ${port}`)
})

