var socket = io.connect('http://' + window.location.hostname);

socket.on('other canvas change', function(data) {
  console.log('other drawers positions');
  console.log(data);
  // redraw other players position in current canvas
});
