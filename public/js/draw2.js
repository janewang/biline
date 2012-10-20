function prevent(e) {
  e.preventDefault();
}

// Create a new path once, when the script is executed:
var myPath = new Path();
myPath.strokeColor = 'black';

// This function is called whenever the user
// clicks the mouse in the view:
function onMouseDown(event) {
    // Add a segment to the path at the position of the mouse:
    myPath.add(event.point);
}

//tool.fixedDistance = 80;
//
//var path;
//var strokeEnds = 0.5;
//
//
//function onMouseDown(event) {
//  prevent(event);
//  path = new Path();
//  path.fillColor = 'black';
//}
//
//var lastPoint;
//function onMouseDrag(event) {
//  // If this is the first drag event,
//  // add the strokes at the start:
//  if (event.count == 1) {
//    addStrokes(event.middlePoint, event.delta * -1);
//  } else {
//    var step = event.delta / 2;
//    step.angle += 90;
//
//    // The top point: the middle point + the step rotated by 90 degrees:
//    //   -----*
//    //   |
//    //   ------
//    var top = event.middlePoint + 10;//step;
//
//    // The bottom point: the middle point - the step rotated by 90 degrees:
//    //   ------
//    //   |
//    //   -----*
//    var bottom = event.middlePoint - 10;//step;
//
//    path.add(top);
//    path.insert(0, bottom);
//  }
//  path.smooth();
//
//  lastPoint = event.middlePoint;
//}
//
//function onMouseUp(event) {
//  var delta = event.point - lastPoint;
//  delta.length = tool.maxDistance;
//  addStrokes(event.point, delta);
//  path.closed = true;
//  path.smooth();
//}
//
//function addStrokes(point, delta) {
//  var step = delta.rotate(90);
//  var strokePoints = strokeEnds * 2 + 1;
//  point -= step / 2;
//  step /= strokePoints - 1;
//  for (var i = 0; i < strokePoints; i++) {
//    var strokePoint = point + step * i;
//    var offset = delta * (Math.random() * 0.3 + 0.1);
//    if (i % 2) {
//      offset *= -1;
//    }
//    strokePoint += offset;
//    path.insert(0, strokePoint);
//  }
//}
//
//
