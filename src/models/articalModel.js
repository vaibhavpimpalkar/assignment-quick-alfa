const mongoose = require("mongoose");

const articalSchema = new mongoose.Schema({
  title : {
    type : String , 
    required : true
  },
   content :{
    type : String,
    required : true
   }, 
   is_premium : {
    type : Boolean,
    default : false
   }

},{timestamp : true})

module.exports = mongoose.model('artical',articalSchema)