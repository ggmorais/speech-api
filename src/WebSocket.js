const io = require('socket.io');
const Room = require('./api/models/Room');

class WebSocket {

  constructor(server) {
    
    this.io = io(server);

    this.socket = null;
    this.userId = null;
    this.activeRoom = null;

    this.io.on('connection', async socket => {
      this.socket = socket;
      this.socket.on('userInfos', async infos => {
        this.userId = infos.userId;
        this.activeRoom = infos.room;
      });
      this.socket.on('newMessage', async msg => {
        this.activeRoom = msg.roomId;
        this.newMessage(msg);
      })

      // First rooms loot
      if (this.userId) this.sendRooms();

    });
  }

  async newMessage({ roomId, body }) {
    Room.updateOne(
      { _id: roomId }, 
      { $push: {
        messages: { user: this.userId, body: body }
      } }
    )
      .exec()
      .then(docs => {
        // Send the new message to all other sockets connected to this room. How?
        //this.socket.broadcast.emit...
      })
  }

  async sendRooms() {
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