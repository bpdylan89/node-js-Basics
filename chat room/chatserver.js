  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var io = require('socket.io')(server);
  var fs = require('fs');
  var http = require('http');
  var url = require('url');
  var edon = require('./newnode.js');
  

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

	socket.on('chat message', function(msg, time){
	  time = edon.DateTime();
	  user = socket.handshake.headers.referer;
      user = user.replace('http://bdprescott.ddns.net:8081/?username=', '');
      console.log(user + ': ' + msg );
	  io.emit('chat message', user + ': ' + msg );
	  fs.appendFile('chatlog.txt', time + ' - ' + user + ': ' + msg + '\n');
    });
  });

  server.listen(8081, function(){
    console.log('listening on *:8081');
  });
 