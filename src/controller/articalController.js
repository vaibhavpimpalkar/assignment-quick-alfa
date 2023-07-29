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

const article1 = new articalModel({
  title: "Article 1",
  content: "This is a sample article1",
  isPremium: false,
});
const article2 = new articalModel({
  title: "Article 2",
  content: "This is a sample article2",
  isPremium: false,
});
const article3 = new articalModel({
  title: "Article 3",
  content: "This is a sample article3",
  isPremium: true,
});

// Save the sample articles
article1.save();
article2.save();
article3.save();

const getartical = async (req, res) => {
  try {
    let id = req.params.id;

    const artical = await articalModel.findById(id);
    if (!artical) {
      return res.status(400).send({ status: false, msg: "id not found" });
    } else {
      return res.status(201).send({ status: true, msg: artical });
    }
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

module.exports = { getartical, getall };
