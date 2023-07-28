const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const commentSchema = new mongoose.Schema({
  article : {
    type : ObjectId , 
    required : true ,
    ref : 'artical'
  },
  user : {
    type : ObjectId ,
    required : true , 
    ref : "user"
  },
  comment : {
    type : String,
    required : true
  },
},{timestamps : true});

module.exports = mongoose.model('comments' , commentSchema)
