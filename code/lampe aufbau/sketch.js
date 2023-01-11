function preload(){
  // preload assets
}


//update
let slider1;
let slider2;
let button;
let button2;
let playStatus = true;

function setup() {
  createCanvas(1000, 1000);
  angleMode(DEGREES);
  frameRate(60)

  // button = createButton("Do it again");
  // button.mousePressed(resetSketch);

  // button = createButton ("Pause")
  // button.mousePressed(pause); 

  slider1 = createSlider(0.1,360,0);
  slider1.position(350, 1005);
  slider1.size(200);
  
  slider2 = createSlider(0,10,2.345,0.01);
  slider2.position(350, 1025);
  slider2.size(500);

  // slider3 = createSlider(0,1,0.01,0.01);
  // slider3.position(350, 1045);
  // slider3.size(500);

  // slider4 = createSlider(0, 0.0001, 1)
  // slider4.position(350, 1065);
  // slider4.size(500);


}

let radius = 0
let angle = 0
let angleReverse = 0
let lengthReverse = 0
let shadowangle = 0
let count = 0
let printDot = false

function draw() {
  const max = (slider2.value()-10) * -9 + 10;
  for (let i=0; i<max; i++) {
  push();
   translate (width / 2, height / 2)
   rotate (angle)

   if (shadowangle > 720) {
   // if (angleReverse >= 0) {

      calcAngleReverse()
   // } else {
    //  radius += slider2.value() * 0.01
   // }
    
   } else {
    angle += slider1.value();
    radius += slider2.value() * 0.01
    
   }
  
   shadowangle += slider1.value();
   //angle += 2165.97
   
   //radius += 0.001
   strokeWeight(5)
   count ++

   printDot = false 
  if (count > 6000 && count <= 7300) {
    count % 180 == 0 ? printDot = true : undefined
  } else if(count > 7300) {
    count % 150 == 0 ? printDot = true : undefined
   } else if (count % 250 == 0) {
    printDot = true
   }

   push();
   translate(radius, 0);
   if (printDot) {
    stroke (0)
    //stroke (random (0,255), random (0,255), random (0,255))
    //point(0,0);

    //fill(0)
    //fill(random (0,255), random (0,255), random (0,255));
    beginShape();
    for(let angleFrac = 0; angleFrac < 360; angleFrac += 30) {
      const radiusFrac = random(10, 30);
      const x = radiusFrac * cos(angleFrac);
      const y = radiusFrac * sin(angleFrac);
      vertex( x  , y );

     
    }
    endShape(CLOSE);

   }
   pop();

   if( count >  8700 ){
    noLoop()
   }

  pop();
  }

}

function calcAngleReverse() {

  angleReverse += 0.000075


  angle += slider1.value() - angleReverse
  radius += slider2.value() * 0.05 + angleReverse

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