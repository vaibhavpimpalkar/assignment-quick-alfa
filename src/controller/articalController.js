const {
  validBody,
  validId,
  validName,
  validPhone,
  validMail,
  validPassword,
  validtitle,
} = require("../validator/validator");

const articalModel = require("../models/articalModel");



const createArtical = async function (req,res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = req.body;
  let savedData = await articalModel.create(data);
  
  res.send({ msg: savedData });
};

const getartical = async (req, res) => {
  try {
    let articalId = req.params.articalId;

    const artical = await articalModel.findById(articalId);
    res.send({status:true,msg:artical})
    
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.msg });
  }
};

const getall = async (req, res) => {
  try {
    const artical = await articalModel.find({ is_premium: false });

    if (artical) {
      return res.status(200).send({ status: true, msg: artical });
    } else {
      return res
        .status(404)
        .send({ status: false, msg: "Artical not found.." });
    }
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.msg });
  }
};

module.exports = { createArtical,getartical, getall };