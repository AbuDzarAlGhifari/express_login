const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../models/auth');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }

  if (!token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token format' });
  }

  const tokenWithoutBearer = token.slice(7);

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Unauthorized - Token expired' });
      } else {
        return res.status(403).json({ error: 'Forbidden - Invalid token' });
      }
    }

    if (decodedToken && decodedToken.exp && isTokenBlacklisted(decodedToken.exp)) {
      return res.status(401).json({ error: 'Unauthorized - Token invalidated (logged out)' });
    }

    req.user = decodedToken;
    next();
  });
}

module.exports = authenticateToken;
