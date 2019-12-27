const jwt = require('jsonwebtoken');

const User = require('../models/User');

class Validator {

  user(req, res, next) {
    try {
      const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Access denied'
      });
    }
  }

  admin(req, res, next) {
    try {
      const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
      
      User.findById(decoded._id)
        .exec()
        .then(user => {
          if (user.admin) {
            console.log('acesso concedido por usr admin')
            return next();
          }
          return res.status(401).json({
            message: 'Access denied'
          });
        })
        .catch(err => console.log('err', err));
      
    } catch (err) {
      return res.status(401).json({
        message: 'Access denied'
      });
    }
  }

  adminLegacy(req, res, next) {
    try {
      const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
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