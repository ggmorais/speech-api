const io = require('socket.io');
const Room = require('./api/models/Room');

class WebSocket {

  constructor(server) {
    
    this.io = io(server);

    this.io.on('connection', async socket => {

      socket.on('userId', async userId => {
        this.roomList(socket, userId);
      });
      
      socket.on('selectedRoom', roomId => {
        socket.join(roomId);

        this.roomData(socket, roomId);
      })

      socket.on('newMessage', async msg => {
        this.newMessage(msg, socket);
      })
    });
  }

  async newMessage({ roomId, userId, body}, socket) {
    Room.updateOne(
      { _id: roomId }, 
      { $push: {
        messages: { user: userId, body: body }
      } }
    )
      .exec()
      .then(docs => {
        Room.findOne({
          _id: roomId 
        }, {
          messages: { $slice: -1 }
        })
          .populate('messages.user', '_id username')
          .exec()
          .then(docs => {
            socket.to(roomId).emit('newMessage', docs);
          })
      })
  }

  async roomData(socket, roomId) {
    Room.find({
      _id: roomId
    })
      .populate('messages.user', '_id username')
      .exec()
      .then(docs => {
        socket.emit('roomData', docs);
      })
  }

  async roomList(socket, userId) {
    Room.find({
      users: userId
    }, {
      name: 1,
      messages: { $slice: -1 }
    })
      .populate('messages.user', 'username _id')
      .exec()
      .then(docs => {
        socket.emit('roomList', docs)
      });

  }

  async sendRoomsOld() {
    Room.find({
      users: this.userId
    })
      .populate('users', '_id username')
      .populate('messages.user', '_id username')
      .select('_id users messages name')
      .exec()
      .then(docs => {
        this.socket.emit('rooms', docs);
      })
      .catch(err => {
        this.socket.emit('err', err);
      });
  }

}

module.exports = WebSocket;