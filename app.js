#!/usr/local/bin/node

var express   = require('express');
var app       = express.createServer();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response, next) {
  response.render('index', {layout: false});
  response.end();
});

app.listen(3000, function() {
    console.log('Now listening on port 3000');    
});
