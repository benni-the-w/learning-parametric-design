function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("#800080");

  fill("#ff4500")
  rect(200, 0, 200, 400);

  fill("#ff4500")
  circle(200, 200, 300);

  fill("#808080")
  circle(0, 0, 200);

  fill("#ff4500")
  circle(0, 0, 100);

  fill("#800080")
  angleMode(DEGREES);

  arc(
    200, 200,
    300, 300,
    270,
    90,
    PIE 
  );

  fill("#808080");
  arc(
    200, 200,
    200, 200,
    90,
    270,
    PIE
  );

  fill("#ff4500");
  arc(
    200, 200,
    100, 100,
    270,
    90,
     PIE
  );

  fill("#000000");
  arc(
    200, 200,
    50, 50,
    90,
    270,
    PIE 
  );

  fill("rgba(128,128,128,1)");
  rect(250, 0, 50, 400);

  

  
}