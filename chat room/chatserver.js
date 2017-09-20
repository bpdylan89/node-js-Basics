  var express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io')(server),
      fs = require('fs'),
      http = require('http'),
      url = require('url'),
      edon = require('./newnode.js');
  

  app.get('/', function(req, res, next) {
  	res.sendFile(__dirname + '/chatindex.html');
  });

  app.use(express.static('public'));


  io.on('connection', function(client) {
  	console.log('Client connected... ');
  });

  io.on('connection', function(socket){
    console.log('a user connected');
	
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
      time = edon.DateTime();
      var useraddress = socket.handshake.address;
      var user = socket.handshake.headers.referer;
      var user = user.replace('http://bdprescott.ddns.net:8081/?username=', '');
      console.log(useraddress + ' - ' + user + ': ' + msg );
      io.emit('chat message', { tme: time, usr: user, txt: msg } );
      fs.appendFile('chatlog.txt', time + ' - ' + useraddress + ' - ' + user + ': ' + msg + '\n');
    });
  });

  server.listen(8081, function(){
    console.log('listening on *:8081');
  });
 
