const mongoose = require('mongoose');
const Room = require('../models/Room');

class RoomController {
  
  index(req, res) {
    Room.find(req.query)
      .populate('users', '_id username')
      .populate('messages.user', '_id username')
      .select('_id users messages name')
      .exec()
      .then(docs => res.json({
        message: 'Listing all chat rooms',
        count: docs.length,
        rooms: docs
      }))
      .catch(err => res.status(500).json(err));
  }

  create(req, res) {
    new Room({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name
    })
      .save()
      .then(doc => res.json({
        message: 'Room created successfully'
      }))
      .catch(err => res.status(500).json(err));
  }

  deleteMany(req, res) {
    Room.deleteMany()
      .exec()
      .then(doc => res.json({
        message: 'All rooms deleted successfully'
      }))
      .catch(err => res.status(500).json(err));
  }

  deleteOne(req, res) {
    Room.deleteOne({ _id: req.params.roomId })
      .exec()
      .then(doc => res.json({
        message: 'All rooms deleted successfully'
      }))
      .catch(err => res.status(500).json(err));
  }

  insertUser(req, res) {
    Room.updateOne(
      { _id: req.params.roomId },
      { $addToSet: { users: req.body.userId } }
    )
      .exec()
      .then(docs => res.json({
        message: 'User joined the room ID ' + req.params.roomId + ' successfully'
      }))
      .catch(err => res.status(500).json(err));
  }

  insertMessage(req, res) {
    Room.updateOne(
      { _id: req.params.roomId }, 
      { $push: {
        messages: { user: req.body.userId, body: req.body.body }
      } }
    )
      .exec()
      .then(docs => res.json({
        message: 'Message sent successfully'
      }))
      .catch(err => res.status(500).json(err));
  }

}


module.exports = new RoomController;