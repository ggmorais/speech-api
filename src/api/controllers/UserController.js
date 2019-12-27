const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

class UserController {

  index(req, res) {
    User.find(req.query)
      .exec()
      .then(docs => res.json({
        message: 'Listing all users',
        users: docs
      }))
      .catch(err => res.status(500).json(err));
  }

  create(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err)
        res.status(500).json(err)
      
      var admAccess = false;

      if (req.body.JWT_KEY === process.env.JWT_KEY) {
        admAccess = true;
      }

      new User({
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        password: hash,
        admin: admAccess
      })
        .save()
        .then(docs => res.json({
          message: 'User created successfully',
          user: docs
        }))
        .catch(err => res.status(500).json(err));
    });
  }

  login(req, res) {
    User.findOne({ username: req.body.username })
      .exec()
      .then(user => {
        if (!user)
          return res.status(401).json({message: 'Username or password are incorrect'})
        
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (!result)
            return res.status(401).json({message: 'Username or password are incorrect'})
          
          const token = jwt.sign({
            username: user.username,
            _id: user._id
          }, process.env.JWT_KEY, {
            expiresIn: '1h'
          });

          return res.json({
            message: 'User authenticated successfully',
            token: token
          })

        })
      })
      .catch();
  }

  deleteMany(req, res) {
    User.deleteMany()
      .exec()
      .then(docs => res.json({
        message: 'All users deleted successfully'
      }))
      .catch(err => res.status(500).json(err))
  }

  deleteOne(req, res) {
    User.deleteOne({_id: req.params.userId})
      .exec()
      .then(docs => res.json({
        message: 'All users deleted successfully'
      }))
      .catch(err => res.status(500).json(err))
  }

}


module.exports = new UserController;