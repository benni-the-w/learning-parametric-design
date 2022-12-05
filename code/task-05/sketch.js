function preload(){
  // preload assets
}

let slider1;
let slider2;
let button;

function setup() {
  createCanvas(1000, 1000);
  angleMode(DEGREES);
  frameRate(60)

  button = createButton("Do it again");
  button.mousePressed(resetSketch);

  slider1 = createSlider(0.1,2500,5);
  slider1.position(100, 1005);
  slider1.size(200);
  
  slider2 =createSlider(0,10,0,0.01);
  slider2.position(300,1005);
  slider2.size(500);

}

let radius = 0
let angle = 0


function draw() {
  
  for (let i=0; i<10; i++) {
  push()
   translate (width / 2, height / 2)
   rotate (angle)
   angle += slider1.value();
   //angle += 2165.97
   radius += slider2.value() * 0.01
   //radius += 0.001
   strokeWeight(5)
   stroke (random (0,255), random (0,255), random (0,255))
   point(radius, 0)
  pop()
  }
    
}

function resetSketch() {
  createCanvas(1000,1000);
  radius=0;
  angle=0;
}