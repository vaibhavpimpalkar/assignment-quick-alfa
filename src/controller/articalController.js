const {validBody , validId , validName , validPhone , validMail , validPassword , validtitle} = require ('../validator/validator')
const artialModel = require("../models/articalModel")


const ceateArticle = async(req,res)=>{

try {
  
  let data = req.body;
  let {}
} catch (err) {
  return res.status(500).send({status : false , msg : err.msg})
}

}








const  getAricle = async(req,res) =>{

try {
  


} catch (err) {
  return res.status(500).send({status : false , msg : err.msg})
}


}









module.exports = {getAricle , ceateArticle}