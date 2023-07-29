const jwt = require("jsonwebtoken");

const {
  validBody,
  validId,
  validName,
  validPhone,
  validMail,
  validPassword,
  validtitle,
} = require("../validator/validator");
const userModel = require("../models/userModel");

///Authentication

const authentication =  function(req,res,next){
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  
  if (!token) return res.send({ status: false, msg: "token must be present" });

let decodedToken = jwt.verify(token, "supersecret");
if (!decodedToken)
return res.send({ status: false, msg: "token is invalid" });
next()

}


////Authorazition

// let authorization = async function (req, res, next) {

//     newToken = req.decodedToken  ///acesses the vaule token by its key i. e req.decoded token

//     /// it will take acesses from Authenticate middleware

//     let newModifiedUser = req.params.userId
//     let loginedinUser = newToken.userId  //stroing the data of newtoken into loginedinuser i.e user id

//     if (newModifiedUser != loginedinUser) return res.send({status:false,msg:"Acesses Deny You don't have Authority for Acesses "});

//     else{
//         next()
//     }
// }
module.exports =  { authentication}