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

const login = async function (req, res) {
  try {
    let loginData = req.body;
    let { email, password, number } = loginData;

    let user = await usermodel.findOne({
      $or: [{ email: email }, { number: number }],
    });
    if (user && user.password === password) return;

    //============================== for password encryption ==============================================
    //comparing hard-coded password to the hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ status: false, message: "wrong password" });
    }
    //=================================== token creation ================================================
    let token = jwt.sign(
      { userId: user._id },
      "supersecret",
      { expiresIn: "24h" }
    );

    return res
      .status(200)
      .send({
        status: true,
        message: "login successfully",
        data: { userId: user._id, token: token },
      });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = { signup, login };
