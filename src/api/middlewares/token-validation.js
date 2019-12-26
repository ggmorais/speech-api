const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const verify = jwt.verify(req.body.token, process.env.JWT_KEY);
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Access denied'
    });
  }
};