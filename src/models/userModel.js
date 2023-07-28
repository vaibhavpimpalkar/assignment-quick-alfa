const mongoose = require("mongoose")


  const userSchema = new mongoose.Schema({
    name : {
      type: String,
      required: true
  },
     number : {
      type : Number,
      required : true
     },
     email : {
      type : String,
      unique : true,
      required:true
     } ,
     password : {
      type : String,
      required : true
     },
     is_premium_user :{
      type : Boolean,
      default : false
     }
  },{timestamps : true})


module.exports = mongoose.model("user",userSchema)