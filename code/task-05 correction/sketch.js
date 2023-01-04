function preload(){
  // preload assets
}

let slider1;
let slider2;
let button;
let button2;
let playStatus = true;

function setup() {
  createCanvas(1000, 1000);
  angleMode(DEGREES);
  frameRate(60)

  button = createButton("Do it again");
  button.mousePressed(resetSketch);

  button = createButton ("Pause")
  button.mousePressed(pause); 

  button = createButton ("slider.reset")
  button.mousePressed(angle0); 

  slider1 = createSlider(0.1,360,0);
  slider1.position(350, 1005);
  slider1.size(200);
  
  slider2 = createSlider(0,10,2.345,0.01);
  slider2.position(350, 1025);
  slider2.size(500);

  slider3 = createSlider(0,1,0.01,0.01);
  slider3.position(350, 1045);
  slider3.size(500);

  slider4 = createSlider(0, 0.0001, 1)
  slider4.position(350, 1065);
  slider4.size(500);


}

let radius = 0
let angle = 0
let angleReverse = 0.1
let lengthReverse = 0

function draw() {
  const max = (slider2.value()-10) * -9 + 10;
  for (let i=0; i<max; i++) {
  push()
   translate (width / 2, height / 2)
   rotate (angle)

   if (angle > 720) {
    if (angleReverse >= 0) {

      calcAngleReverse()
    } else {
      radius += slider2.value() * 0.01
    }
    
   } else {
    angle += slider1.value();
    radius += slider2.value() * 0.01
   }
  
   //angle += 2165.97
   
   //radius += 0.001
   strokeWeight(5)
   stroke (random (0,255), random (0,255), random (0,255))
   point(radius, 0)
  pop()
  }

}

function calcAngleReverse() {

  angleReverse -= 0.0001


  angle += angleReverse
  radius += slider2.value() * 0.01 * 0.4/angleReverse 

}

function angle0() {
  tmp =10;
}

function pause() {
  if (playStatus) {
    noLoop();
    playStatus = false;
  } else {
    loop();
    playStatus = true;
  }
}

function resetSketch() {
  createCanvas(1000,1000);
  radius=0;
  angle=0;
}