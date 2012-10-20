#!/usr/local/bin/node

var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.use(express.cookieParser());
//app.use(express.session({secret: 'helloooo'}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next) {
  //req.session.touch();
  res.render('index.ejs', {layout: false});
  res.end('hello');
});

app.listen(3000, function() {
  console.log('Now listening on port 3000');    
});
