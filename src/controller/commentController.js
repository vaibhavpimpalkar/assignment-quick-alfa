const articalModel = require("../models/articalModel");

const comment = async (req, res) => {
  try {
    const { artical_reference, comment } = req.body;

    const artical = await articalModel.findById(artical_reference);

    if (!artical) {
      return res.status(404).json({ message: 'Artical not found' });
    }

    if (artical.is_premium && !req.user?.is_premium_user) {
      return res.status(403).json({ message: 'Premium artical, upgrade to comment' });
    }

    const newComment = new Comment({
      artical_reference,
      user_reference: req.userId,
      comment,
    });

    await newComment.save();
    res.status(201).json({ message: 'Comment added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment',});
  }
};







module.exports = { comment };