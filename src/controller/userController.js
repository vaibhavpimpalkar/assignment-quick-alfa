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
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

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
      return res
        .status(400)
        .send({
          status: false,
          msg: "number is already exist, please provide another ",
        });
    }

    const Email = await usermodel.findOne({ email: email });

    if (Email) {
      return res
        .status(400)
        .send({
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

const login = async (req, res) => {
  try {
    let data = req.body;
    // ---------- validations start -----------------
    // if (!validBody(data))
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "Please provide email and password" });

    let { email, number, password } = data;

    // // if (!email || !password)
    // //   return res
    // //     .status(400)
    // //     .send({ status: false, message: "Please provide email and password" });

    // // if (!validMail(email))
    // //   return res.status(400).send({
    // //     status: false,
    // //     message: "Please provide valid Mail",
    // //   });

    // // if (!validPassword(password))
    // //   return res.status(400).send({
    // //     status: false,
    // //     message: "Please provide valid password",
    // //   });

    // // if (!validPhone(number)) {
    // //   return res
    // //     .status(400)
    // //     .send({ status: false, msg: "please provide valid Number.." });
    // // }

    // const user = await usermodel.findOne({
    //   number  :  number,
    //   email : email
    // });

    // if (user && user.password === password) {
    //   res.status(200).send({
    //     status: true,
    //     msg: user,
    //   });
    // } else {
    //   res.status(401).send({
    //     status: false,
    //     msg: "Invalid login credentials",
    //   });
    // const { numberOrEmail, password } = data;
    const user = await usermodel.findOne({ $or: [ { number: number }, { email: email } ] });
  if (!user) {
    return res.status(400).send({ message: 'Invalid credentials' });
  }

const pass = await usermodel.findOne({user,password})

if (!pass) return res.status(400).send({msg : })

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });

      // ------ End -------------
      let token = jwt.sign({ user: user._id.toString() }, "supersecret", {
        expiresIn: "24h",
      });
      res.status(201).send({ status: true, message: "Success", data: token });
    }
  
  }
  catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
}

module.exports = { signup, login };
