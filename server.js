let express = require('express');
let app = express();
let server = app.listen(3000, () => console.log('Server listening at http://localhost:' + server.address().port));
app.use(express.static('web'));
let io = require('socket.io')(server); // socket.io uses http servers,

let players = [];

class Player {
  constructor(id) {
    this.id = id;
    this.mouseX = 0;
    this.mouseY = 0;
  }
}

io.sockets.on('connection', (socket) => {
  // bij verbinden
  players.push(new Player(socket.id));

  socket.on('stroke', (s) => {
    socket.broadcast.emit('stroke', s);
  })

  socket.on('client_update', (mx, my) => {
    for (let p of players) {
      if (p.id == socket.id) {
        p.mouseX = mx;
        p.mouseY = my;
        break;
      }
    }
  })
});

setInterval(()=>{
  io.emit('server_update', players);
}, 17)