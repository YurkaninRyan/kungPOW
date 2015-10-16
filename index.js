var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http)
    port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendfile('index.html');
});

http.listen(port, function(){
  console.log('listening on ' + port);
});
