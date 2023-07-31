const usermodel = require("../models/userModel");
const {
  validBody,
  validId,
  validName,
  validPhone,
  validMail,
  validPassword,
  validtitle,
} = require("../validator/validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


//----------------------------user sign up----------------------------
const signup = async (req, res) => {
  try {
    let data = req.body;
    const { name, number, email, password, is_premium_user } = data;
    if (!name) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide name " });
    }

    if (!validBody(data)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide Data in request body.." });
    }

    if (!validName(name.trim())) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide valid name" });
    }

    if (!number) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide number" });
    }

    if (!validPhone(number)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide valid number" });
    }

    if (!email) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide email" });
    }

    if (!validMail(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide valid email" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide valid password" });
    }

    if (!validPassword(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide valid password" });
    }
    const num = await usermodel.findOne({ number: number });

    if (num) {
      return res.status(400).send({
        status: false,
        msg: "number is already exist, please provide another ",
      });
    }

    const Email = await usermodel.findOne({ email: email });

    if (Email) {
      return res.status(400).send({
        status: false,
        msg: "email is already exist, please provide another",
      });
    }

    const salt = await bcrypt.genSalt(10);
    encryptedPassword = await bcrypt.hash(password, salt);

    const createUser = {
      name: name,
      number: number,
      email: email,
      password: encryptedPassword,
    };
    let saved = await usermodel.create(createUser);

    res.status(201).send({ status: true, msg: saved });
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};

//----------------------------user login------------------------
const login = async function (req, res) {
  try {
    let loginData = req.body;
    let { email, password, number } = loginData;

    let user = await usermodel.findOne({
      $or: [{ email: email }, { number: number }],
    });
    if (user && user.password === password) return;
    if(!user ) return res.status(404).send ({status : false ,msg : "user not found"})

    //============================== for password encryption ==============================================
    //comparing hard-coded password to the hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ status: false, message: "wrong password" });
    }
    //=================================== token creation ================================================
    let token = jwt.sign(
      {
        userId: user._id.toString(),
      
      },
      "supersecret"
    );
    res.setHeader("x-auth-token", token);
    res.send({ status: true, data: token });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
//------------------------updating user-------------------------------------
const update = async (req, res) => {
  try {
  
    let userId = req.params.userId;
    let user = await usermodel.findById(userId);
    //Return an error if no user with the given id exists in the db
    if (!user) {
      return res.send("No such user exists");
    }
    let userData = req.body;
  let updatedUser = await usermodel.findOneAndUpdate({ _id: userId }, userData,{new:true});
  res.send({ status: updatedUser});
  
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }

}

//-------------------------deleted user------------------------------
const deleteuser = async (req,res) =>{
  try {
    await usermodel.findByIdAndDelete(req.userId).exec();
    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user profile' });
  }

};

module.exports = { signup, login , update , deleteuser};