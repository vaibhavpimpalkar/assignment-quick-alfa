const express = require("express");
const router = express.Router();


// ______________________________________IMPORTING ALL MDULES________________________________

const {
  signup,
  login,
  update,
  deleteuser,
} = require("../controller/userController");

const { getartical, getall } = require ("../controller/articalController")

const { comment } = require("../controller/commentController");

const { authentication } = require("../middleware/auth")

const {premiumuser} = require ("../controller/premiumController")



// __________________________________USER __________________________________

router.post("/signup", signup);
router.post("/login", login);
router.post("/editUser",authentication, update);
router.delete("/deleteUser",authentication, deleteuser);

// _____________________ARTICLE_____________________________________________

router.get("/getArticle/:id", getartical);
router.get("/getAllArticles", getall);

// ______________________________________COMMENT____________________________

router.post("/comment",comment)

// _______________________PREMIUM___________________________________________

router.post("/goPremium",premiumuser)





module.exports = router;
