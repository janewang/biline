
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , sio = require('socket.io');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('keyboardcatz'));
  //app.use(express.session({secret: 'panda'}));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res, next) {
  res.render('index', {layout: false});
  res.end();
});

var server = http.createServer(app);

server.listen(app.get('port'), function() {
    console.log('Server listening %d', app.get('port'));    
});

var io = sio.listen(server, {log: false});

// assuming io is the Socket.IO server object - for Heroku only
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
  console.log('Drawer named ' + socket.id + ' has joined the session.');
  socket.on('canvas change', function (data) {
    socket.broadcast.emit('other canvas change', data);
  });

  socket.on('disconnect', function() {
    console.log('Drawer named ' + socket.id + ' has disconnected.');
  });
});

app.get('/', function(req, res, next) {
  res.render('index', {layout: false});
  res.end();
});
