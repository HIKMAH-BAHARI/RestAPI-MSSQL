const jwt = require('jsonwebtoken');
require ('dotenv').config()

const authenticateToken = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. Token is required.' });
  }

  try {
    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid Token' });
  }
};

module.exports = authenticateToken