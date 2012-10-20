#!/usr/local/bin/node

var express = require('express');
var app = express.createServer();

app.get('/', function(request, response, next) {
  response.send("Just testing. Looks like we're good\n");
  response.end();
});

app.listen(3000);
console.log('Now listening on 3000');
