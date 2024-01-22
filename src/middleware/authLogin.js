const jwt = require('jsonwebtoken');
const User = require('../models/users');

const secretKey = process.env.SECRET_KEY;

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token tidak ditemukan' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    const user = await User.loginUser(decodedToken.email);

    if (!user) {
      return res.status(403).json({ success: false, message: 'Tidak dapat menemukan pengguna' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Error decoding or verifying token:', err);
    res.status(403).json({ success: false, message: 'Token tidak valid' });
  }
};
