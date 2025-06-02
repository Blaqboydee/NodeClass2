const express = require("express");
const {getTodo, addTodo, deleteTodo, editTodo, update} = require("../Controllers/todo.controller");

const todorouter = express.Router();

todorouter.get("/", getTodo)

todorouter.post("/", addTodo)

todorouter.post("/delete", deleteTodo)

todorouter.get("/edit/:id", editTodo)

todorouter.post("/update", update)





module.exports = todorouter