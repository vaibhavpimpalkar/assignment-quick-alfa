const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  update,
  deleteuser,
} = require("../controller/userController");

const { getartical, getall } = require ("../controller/articalController")

const commentModel = require("../controller/commentController");

const { authentication } = require("../middleware/auth")

// __________________________________USER __________________________________

router.post("/signup", signup);
router.post("/login", login);
router.post("/editUser",authentication, update);
router.delete("/deleteUser",authentication, deleteuser);

router.get("/getArticle/:id", getartical);
router.get("/getAllArticles", getall);

module.exports = router;
