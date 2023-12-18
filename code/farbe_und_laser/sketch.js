let circleRadius = 100;
let numPoints = 12;
let points = [];

function setup() {
  createCanvas(400, 400);
  generatePoints();
}

function draw() {
  background(220);
  drawPolygon();
}

function generatePoints() {
  let angles = [];
  
  // Generate random angles
  for (let i = 0; i < numPoints; i++) {
    angles.push(random(TWO_PI));
  }

  // Sort angles
  angles.sort();

  // Create points along sorted angles
  for (let i = 0; i < numPoints; i++) {
    let x = width / 2 + cos(angles[i]) * circleRadius;
    let y = height / 2 + sin(angles[i]) * circleRadius;
    points.push(createVector(x, y));
  }
}

function drawPolygon() {
  beginShape();
  for (let i = 0; i < numPoints; i++) {
    vertex(points[i].x, points[i].y);

    let nextIndex = (i + 1) % numPoints;
    line(points[i].x, points[i].y, points[nextIndex].x, points[nextIndex].y);
  }
  endShape(CLOSE);
}