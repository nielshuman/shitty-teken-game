let express = require('express');
let app = express();
let server = app.listen(3000, () => console.log('Server listening at http://localhost:' + server.address().port));
app.use(express.static('web'));
let io = require('socket.io')(server); // socket.io uses http servers,

io.sockets.on('connection', (socket) => {
  // bij verbinden

  socket.on('stroke', (s) => {
    socket.broadcast.emit('stroke', s);
  })
});
