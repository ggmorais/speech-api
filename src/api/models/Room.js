const mongoose = require('mongoose');


const roomSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  image: String,
  users: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [ { user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, body: String, postDate: { type: Date, default: Date.now() } } ]
});


module.exports = mongoose.model('Room', roomSchema);