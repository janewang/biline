var socket = io.connect('http://' + window.location.hostname);
var canvas = document.getElementById('#canvas');
paper.setup(canvas);

var path;
var strokeEnds = 0.5;
var lastPoint;

function onMouseDown() {
  path = new paper.Path();
  path.fillColor = 'red'; // other players strokes are red
}

function onMouseDrag(data) {
  if (data.count == 1) {
    addStrokes(data.middlePoint, data.delta * -1);
  }
  else {
    var step = data.delta / 2;
    step.angle += 90;
    var top = data.topPoint;
    var bottom = data.bottomPoint;
    path.add(top);
    path.insert(0, bottom);
  }
  path.smooth();
  lastPoint = data.lastPoint;
}

function onMouseUp(data) {
  var delta = data.delta;
  delta.length = data.length; // check if can sent this directly
  addStrokes(data.eventPoint, data.delta);
  path.closed = true;
  path.smooth();
}

function addStrokes(point, delta) {
  var step = delta;
  //var step = delta.rotate(90);
  var strokePoints = strokeEnds * 2 + 1;
  point -= step / 2;
  step /= strokePoints - 1;
  for (var i = 0; i < strokePoints; i++) {
    var strokePoint = point + step * i;
    var offset = delta * (Math.random() * 0.3 + 0.1);
    if (i % 2) {
      offset *= -1;
    }
    strokePoint += offset;
    path.insert(0, strokePoint);
  }
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

