const mongoose = require("mongoose")


const todoschema = mongoose.Schema({
  title:{type:String, required:true},
  content:{type:String, required:true}
})

const todomodel = mongoose.model("todo_collections", todoschema)

module.exports = todomodel