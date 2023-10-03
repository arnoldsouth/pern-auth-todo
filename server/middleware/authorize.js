const jwt = require('jsonwebtoken');
require('dotenv').config();

// Use token if it in local storage, middleware will continue

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('jwt_token');

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: 'Authorization denied' });
  }

  // Verify token
  try {
    // Gives us the user id (user:{id: user.id})
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
