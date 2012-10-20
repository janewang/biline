var socket = io.connect('http://' + window.location.hostname);

socket.emit('canvas change', function(data) {
  // emit self canvas change to server
});

socket.on('others canvas change', function(data) {
  // draw other players movements
});
