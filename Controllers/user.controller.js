const { request } = require("express");
const usermodel = require("../Models/user.model")
let message;


const getLandingPage = (request, response) => {
    response.render("index")
}


const getSignup = (request, response) => {
    response.render("signup", {message})
}

const getLogin = (request, response) => {
    response.render("login", {message})
}

const Signup = async (req, res)=>{
  console.log(req.body);
  
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

}


const Login = async(req,res)=>{

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
 

}





module.exports = {getLandingPage, getSignup, getLogin, Signup, Login}