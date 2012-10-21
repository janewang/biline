////////////////////////////////////////////////////////////////////////////////
// This script belongs to the following tutorial:
//
// http://scriptographer.org/tutorials/geometry/working-with-mouse-vectors/#adding-brush-stroke-ends

tool.fixedDistance = 80;

var path;
var strokeEnds = 0.5;
var dataForServer;

function prevent(e) {
  e.preventDefault();
}

// make instance of path and setup path attributes
function onMouseDown(event) {
  prevent(event);
  dataForServer = {
    type: 'mousedown'
  }
  socket.emit('canvas change', dataForServer);
  path = new Path();
  path.fillColor = 'black';
}

var lastPoint;

function onMouseDrag(event) {
  // If this is the first drag event, add the strokes at the start:
  if (event.count == 1) {
    addStrokes(event.middlePoint, event.delta * -1);
    dataForServer = {
      middlePoint: event.middlePoint,
      delta: event.delta,
      count: event.count,
      type: 'mousedrag'
    }
    socket.emit('canvas change', dataForServer);
  } else {
    var step = event.delta / 2;
    step.angle += 90;

    // The top point: the middle point + the step rotated by 90 degrees:
    var top = event.middlePoint + 10;//step;

    // The bottom point: the middle point - the step rotated by 90 degrees:
    var bottom = event.middlePoint - 10;//step;

    dataForServer = {
      step: step,
      lastPoint: lastPoint,
      topPoint: top,
      bottomPoint: bottom,
      count: event.count,
      type: 'mousedrag'
    }
    socket.emit('canvas change', dataForServer);

    path.add(top);
    path.insert(0, bottom);

  }
  path.smooth();
  lastPoint = event.middlePoint;
}

function onMouseUp(event) {
  var delta = event.point - lastPoint;
  delta.length = tool.maxDistance;
  addStrokes(event.point, delta);

  dataForServer = {
    lastPoint: lastPoint,
    eventPoint: event.point,
    delta: delta,
    type: 'mouseup'
  }
  socket.emit('canvas change', dataForServer);

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
