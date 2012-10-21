var socket = io.connect('http://' + window.location.hostname);
var canvas = document.getElementById('#canvas');
paper.setup(canvas);

var tool = new paper.Tool();
tool.fixedDistance = 80;

var strokeEnds = 0.5;
var path;

function onMouseDown() {
  path = new paper.Path();
  path.fillColor = 'red'; // other players strokes are red
}

var lastPoint;

function onMouseDrag(data) {
  if (data.count == 1) {
    addStrokes(data.middlePoint, data.delta * -1);
  }
  else {
    var step = data.step;
    step.angle += 90;
    path.add(data.topPoint);
    path.insert(0, data.bottomPoint);
  }
  path.smooth();
  lastPoint = data.lastPoint;
}

function onMouseUp(data) {
  var delta = data.delta;
  delta.length = tool.maxDistance;
  addStrokes(data.eventPoint, data.delta);
  path.closed = true;
  path.smooth();
}

function addStrokes(point, delta) {
  var step = delta;
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

