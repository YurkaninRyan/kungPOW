var app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    pf = require('port-friends'),
    twilio = require('./twilio'),
    PORT = process.env.PORT || 80;

app.set('port', PORT);

pf.listen(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
