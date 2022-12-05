function preload(){
  // preload assets
}

//let slider1;
//let slider2;
//let button;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  frameRate(60)

 // button = createButton("reset sketch");
 // button.mousePressed(resetSketch);
//
 // slider1 = createSlider(0.1,2500,10);
 // slider1.position(100, 805);
 // slider1.size(200);
 // 
 // slider2 =createSlider(0,10,0,0.001);
 // slider2.position(300,805);
 // slider2.size(500);

}

let radius = 0
let angle = 0


function draw() {
  for (let i=0; i<100; i++) {
  push()
   translate (width / 2, height / 2)
   rotate (angle)
   //angle += slider1.value();
   angle += 180.55
  // radius += slider2.value() * 0.01
   radius += 0.05
   strokeWeight(5)
   stroke (random (0,255), random (0,255), random (0,255))
   point(radius, 0)
  pop()
  }
    
}