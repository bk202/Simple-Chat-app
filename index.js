var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');
var io = require('socket.io')(http);

_dirname = fs.realpathSync('.');

app.get('/', function(req, res){
	res.sendFile(_dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('A user connected');

	socket.on('disconnect', function(){
		console.log('A user disconnected');
	});

	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
	console.log('listen on *:3000');
});