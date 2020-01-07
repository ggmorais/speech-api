require('dotenv').config();
const app = require('./app');
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(process.env.PORT || 5000);

// io.on('connection', socket => {
//   console.log('socket id connected: ', socket.id);
// });
