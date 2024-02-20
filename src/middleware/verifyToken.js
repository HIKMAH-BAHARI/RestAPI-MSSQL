const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, 'HIKMAHBAHARI!!!', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = decoded;

    next();
  });
};

module.exports = verifyToken
