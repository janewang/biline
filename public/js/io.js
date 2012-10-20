var socket = io.connect('http://' + window.location.hostname);
var canvas = document.getElementById('#canvas');
paper.setup(canvas);

var path;
var strokeEnds = 0.5;
var lastPoint;

function onMouseDown() {
  path = new paper.Path();
  path.fillColor = 'red'; // other players path are red
}

function onMouseDrag(data) {
  /*
  var setp = data.delta / 2;
  step.angle += 90;
  var top = data.middlePoint + 10;
  var bottom = event.middlePoint - 10;
  path.add(top);
  path.insert(0, bottom);
  path.smooth();
  lastPoint = data.middlePoint;
  */
}

function onMouseUp(data) {
  /*
  var delta = data.point - lastPoint;
  delta.length = paper.tool.maxDistance;
  addStrokes(data.point, delta);
  path.closed = true;
  path.smooth();
  */
}

socket.on('other canvas change', function(data) {
  if (data.type === 'mousedown') {
    onMouseDown();
  } else if (data.type === 'mousedrag') {
    onMouseDrag(data);
  } else if (data.type === 'mouseup') {
    onMouseUp(data);
  }
});

