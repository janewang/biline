#!/usr/local/bin/node

var express = require('express');
var app = express.createServer();
console.log(__dirname + '/public');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response, next) {
  response.render('index.ejs', {layout: false});
  response.end();
});

app.listen(3000);
console.log('Now listening on 3000');
