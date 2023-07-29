const {
  validBody,
  validId,
  validName,
  validPhone,
  validMail,
  validPassword,
  validtitle,
} = require("../validator/validator");

const commentModel = require("../models/commentsModel");
const articalModel = require("../models/articalModel");

const comment = async (req, res) => {
  try {
    const { articleId, comment } = req.body;

    if (!articleId)
      return res
        .status(400)
        .send({ status: false, msg: "please provide artical id" });

    // Find the article id
    const article = articalModel.findById(articleId);

    if (!article) {
      return res.status(404).send({ status: false, msg: "invalid artical id" });
    }
    let data = { articalModel, comment };

    const result = await commentModel.create(data);
    return res.status(201).send({ status: true, msg: result });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.msg });
  }
};

module.exports = { comment };
