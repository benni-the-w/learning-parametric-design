function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("#ba55d3");

  fill("#e0ffff")
  rect(200, 0, 200, 400);

  fill("#e0ffff")
  circle(200, 200, 300);

  fill("#ba55d3")
  angleMode(DEGREES);

  arc(
    200, 200,
    300, 300,
    270,
    90,
    PIE 
  );

  fill("#778899 ");
  arc(
    200, 200,
    200, 200,
    90,
    270,
    PIE 
  );

  fill("#ee82ee");
  

  arc(
    200, 200,
    100, 100,
    270,
    90,
    PIE 
  );

  fill("#778899 ");
  rect(250, 0, 50, 400);
}