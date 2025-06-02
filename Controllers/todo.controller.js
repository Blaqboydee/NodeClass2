const { request } = require("express");
const todomodel = require("../Models/todo.model")
let message;

const getTodo = async (request, response) => {
     const  todos = await todomodel.find();
      response.render("todo", {todos, message})
}

const addTodo = async(req, res)=>{
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

}

const deleteTodo =  async(req, res) =>{
    console.log(req.body.id);
    const id = req.body.id;
    await todomodel.findByIdAndDelete(id); 
    res.redirect("/todo")

}

const editTodo =  async(req, res)=>{
   const _id = req.params.id;
   console.log(_id);
   const oneToEdit = await todomodel.findOne({ _id })
   console.log(oneToEdit);
  res.render("edit", {_id, oneToEdit})
}


const update = async (req, res)=>{
    console.log(req.body);
    const title = req.body.title;
    const content = req.body.content;
    const _id = req.body.editIndex
    await todomodel.findByIdAndUpdate(_id, { title, content });
    res.redirect("/todo")
}

module.exports = {getTodo, addTodo, deleteTodo, editTodo, update};