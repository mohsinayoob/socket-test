const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Locations = require("./model")

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  var query = socket.handshake.query;
  if (query.roomName) { //roomName means orderId/customerId
    socket.join(query.roomName)
  }

  socket.on('updateObjectLocation', data => {
    console.log(socket.rooms)
    console.log(data)
    Locations.create(data)
    io.to(data.roomName).emit('updatedObjectLocation', data);
  });
});

http.listen(port, () => {
  
  mongoose.Promise = global.Promise;

  mongoose.connect('mongodb://localhost/viame-locations', {});

  mongoose.connection
    .once('open', () => console.log('Connected to the database'))
    .on('error', err => console.error(err));

  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
