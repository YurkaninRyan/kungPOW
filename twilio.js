=var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN),
    resp = new twilio.TwimlResponse();

exports.setup = function(app) {
    app.post('/', function (req, res) {
        resp.say('Hi! Let me get my friend.',
            {
                voice:'alice',
                language:'en-gb'
            })
            .dial({
                action:'http://example.com/something.php'
            }, function(node) {
                node.conference('THE RING', {
                beep:'false',
                maxParticipants: 2
            });
         });
        res.send(resp);
    });
};

exports.call = function(convoId) {
    var convo = data.findConvo(convoId);
    if (convo) {
        var clientHandles = convo.clients;
        console.log('convo', convo);
        var clientNumbers = [data.findClient(clientHandles[0]).number, data.findClient(clientHandles[1]).number];

        client.makeCall({
            to: clientNumbers[0],
            from: '+12013806232',
            url: 'http://litecst.cloudapp.net/?convoId=' + convo.id
        }, function(err, responseData) {
            if(err) { console.trace(err) }
            else{ console.log(responseData.from); }
        });

        client.makeCall({
            to: clientNumbers[1],
            from: '+12013806232',
            url: 'http://litecst.cloudapp.net/?convoId=' + convo.id
        }, function(err, responseData) {
            if(err) { console.trace(err) }
            else{ console.log(responseData.from); }
        });
    }
};
