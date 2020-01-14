require('dotenv').config();
const app = require('./app');
const http = require('http').Server(app);
const WebSocket = require('./WebSocket');

new WebSocket(http);

http.listen(process.env.PORT || 5000);