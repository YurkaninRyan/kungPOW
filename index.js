var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    pf = require('port-friends'),
    PORT = process.env.PORT || 3000;

app.set('port', PORT)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

pf.listen(app);
