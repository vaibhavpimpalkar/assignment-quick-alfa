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

module.exports =  { authentication}