const express = require("express")
const router = express.Router();
const {signup , login} = require ("../controller/userController")

const  artialModel = require("../models/articalModel")

const commentModel = require("../models/commentsModel")

// const middleware = require("../middleware")

router.post("/signup",signup);
router.post("/login",login);


module.exports = router;