const usermodel = require("../models/userModel");

const premiumuser = async (req, res) => {
  try {
    await usermodel.findByIdAndUpdate(req.userId, { is_premium_user: true });
    res.status(200).json({ message: 'Upgraded to Premium successfully' });
} catch (error) {
    res.status(500).json({ message: 'Error upgrading to Premium', error });
  }
}


module.exports = {premiumuser}