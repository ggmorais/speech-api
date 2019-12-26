const Room = require('../models/Room');


class RoomController {
  
  async index(req, res) {
    Room.find()
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

  async create(req, res) {
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

  async delete(req, res) {
    Room.deleteMany()
      .exec()
      .then(doc => res.json({
        message: 'All rooms deleted successfully'
      }))
      .catch(err => res.status(500).json(err));
  }

  async insertUser(req, res) {
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

  async insertMessage(req, res) {
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