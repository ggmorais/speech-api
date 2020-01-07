const jwt = require('jsonwebtoken');

const User = require('../models/User');

class Validator {

  validation(req, res, next) {
    try {
      const decoded = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
      res.json({ message: 'Token valid' })
    } catch (err) {
      return res.status(401).json({
        message: 'Access denied'
      });
    }
  }

  user(req, res, next) {
    try {
      const decoded = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Access denied'
      });
    }
  }

  admin(req, res, next) {
    try {
      const decoded = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
      
      User.findById(decoded._id)
        .exec()
        .then(user => {
          if (user.admin) {
            return next();
          }
          return res.status(401).json({
            message: 'Access denied'
          });
        })
        .catch(err => res.status(500).json(err));
      
    } catch (err) {
      return res.status(401).json({
        message: 'Access denied'
      });
    }
  }

  adminLegacy(req, res, next) {
    try {
      const decoded = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
      if (!decoded.admin)
        throw new Error();

      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Access denied'
      });
    }
  }

}

module.exports = new Validator();