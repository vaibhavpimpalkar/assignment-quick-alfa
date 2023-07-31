const express = require("express");
const router = express.Router();


// _____________________________________IMPORTING ALL MDULES_______________________________

const {
  signup,
  login,
  update,
  deleteuser,
} = require("../controller/userController");

const { createArtical,getartical, getall } = require ("../controller/articalController")

const { comment } = require("../controller/commentController");

const { authentication } = require("../middleware/auth")

const {premiumuser} = require ("../controller/premiumController")



// __________________________________USER __________________________________

router.post("/signup", signup);
router.post("/login", login);
router.post("/editUser/:userId",authentication, update);
router.delete("/deleteUser",authentication, deleteuser);

// ____________________ARTICLE____________________________________________
router.post("/Artical",createArtical);
router.get("/getArticle/:articalId", getartical);
router.get("/getAllArticles", getall);

// _____________________________________COMMENT___________________________

router.post("/createcomment",authentication,comment)

// ______________________PREMIUM__________________________________________

router.post("/goPremium",authentication,premiumuser)





module.exports = router;