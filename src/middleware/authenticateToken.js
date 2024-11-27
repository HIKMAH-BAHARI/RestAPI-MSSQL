const jwt = require('jsonwebtoken');
require ('dotenv').config()

const authenticateToken = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  const staticToken = process.env.STATIC_TOKEN;
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. Token is required.' });
  }

  try {

    if (token === staticToken) {
      req.user = { role: 'static_user' };
      return next();
    }
    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid Token' });
  }
};

module.exports = authenticateToken