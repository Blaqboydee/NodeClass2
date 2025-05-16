const express = require("express");
const app = express();
require("ejs");



let name = "Eriifeoluwasimi";
let gender = "Female"
app.set("view engine", "ejs")
app.use(express.urlencoded())  //Middleware, which accepts the type of information being sent. Without this, req.body will be undefined.

let userarray = [];
let todos = [];
let username;
let useremail;




let thename = "bisi";

app.get("/user", (req, res)=>{
    res.send("Hello, User")
  })

app.get("/", (req, res)=>{
  res.render("index", {name, gender})
})

app.get("/signup", (req, res) => {
 res.render("signup")
})


app.get("/login",(req, res)=>{
  res.render('login')
})


app.post("/user/login",(req,res)=>{
  console.log(req.body)

 const theuser = userarray.find((user) => user.email === req.body.email)
 console.log(theuser);
username = theuser.username
useremail = theuser.email

 if (theuser && theuser.password === req.body.password) {
  console.log("welcome user");
  res.redirect("/todo")
 } else {
  console.log("invalid user");
   res.redirect("/login")
 }
})




app.get("/html", (req, res)=>{
   res.sendFile(__dirname + "/index.html")
})

app.post("/user/signup", (req, res)=>{
userarray.push(req.body)
console.log(userarray);
res.redirect("/login")
})



app.get("/todo", (req, res)=>{
    res.render("todo", {todos})
})


app.post("/user/todo", (req, res)=>{
    todos.push(req.body)
    console.log(todos);
    res.redirect("/todo")
})


app.post("/todo/delete", (req, res) =>{
    console.log(req.body.index);
    const indexToDelete = req.body.index;
    todos.splice(indexToDelete, 1);
    console.log(todos);
    res.redirect("/todo")
})

app.get("/todo/edit/:index",(req, res)=>{
    console.log(req.params);
    const indexToEdit = req.params.index;
    console.log(indexToEdit);
    res.render("edit", {todos, indexToEdit})
})


app.post("/update", (req, res)=>{
  console.log(req.body);
  const title = req.body.title;
  const content = req.body.content;
  const editIndex = req.body.indexToEdit;

  const newTodo = {
    title,
    content
  }


  todos[editIndex] = newTodo
  console.log(newTodo);
  res.redirect("/todo")
  
})




const port = 3000;

app.listen( port, ()=>{
  console.log(`app is running on port ${port}`)
})


