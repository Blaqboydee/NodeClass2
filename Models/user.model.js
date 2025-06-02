const mongoose = require("mongoose")


const userschema = mongoose.Schema({
   username:{type:String, required:true},
   email:{type:String, required:true, unique:true},
   password:{type:String, required:true}
})


const usermodel = mongoose.model("user_collectionss", userschema)

module.exports = usermodel