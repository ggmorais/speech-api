const mongoose = require('mongoose');


const userModel = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  admin: Boolean
});


module.exports = mongoose.model('User', userModel);