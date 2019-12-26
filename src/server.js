require('dotenv').config();

const app = require('./app');

app.listen(process.env.PORT || 5000);

//const io = ws(server);

/*
io.on('connection', socket => {
  console.log('Socket connected');
  
  socket.on('chat', data => {
    console.log('Receiving message: ', data);
    
  });

  setInterval(() => {
    io.sockets.emit('chat', {
      user: 'Gustavo',
      message: 'EAE',
      id: uniqueId()
    });
  }, 5000);

});
*/