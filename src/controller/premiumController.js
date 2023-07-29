
const premiumuser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user.is_premium_user = true;
  await req.user.save();

  res.json({ message: 'User is now a premium user' });
}


module.exports = {premiumuser}