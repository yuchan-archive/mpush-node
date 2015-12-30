var apn = require('apn');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/apns', function (req, res) {
  var options = { };
  var apnConnection = new apn.Connection(options);
  var token = "device token"
  var myDevice = new apn.Device(token);
  var note = new apn.Notification();
  note.expiry = Math.floor(Date.now() / 1000) + 3600;
  note.badge = 0;
  note.sound = "ping.aiff";
  note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
  note.payload = {'messageFrom': 'Caroline'};
  apnConnection.pushNotification(note, myDevice);
  apnConnection.shutdown();
  res.send("pushed!!");
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
