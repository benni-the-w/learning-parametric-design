function preload(){
  // preload assets
}


//update
let playStatus = true;

function setup() {
  createCanvas(1000, 1000);
  angleMode(DEGREES);
  frameRate(60)
}
const angleOffset = 0.1
const radiusOffset = 2.345
let radius = 0
let angle = 0
let angleReverse = 0
let lengthReverse = 0
let shadowangle = 0
let count = 0
let printDot = false

function draw() {
  const max = (radiusOffset-10) * -9 + 10;
  for (let i=0; i<max; i++) {
  push();
   translate (width / 2, height / 2)
   rotate (angle)

   if (shadowangle > 720) {
   // if (angleReverse >= 0) {

      calcAngleReverse()
   // } else {
    //  radius += 2.345 * 0.01
   // }0.1
    
   } else {
    angle += angleOffset
    radius += radiusOffset * 0.01
    
   }
  
   shadowangle += angleOffset;
   //angle += 2165.97
   
   //radius += 0.001
   strokeWeight(1)
   count ++

   printDot = false
   
   if(count<2000 || count ==1) {
    count % 870 == 0 ? printDot = true : undefined
   } else if(count < 3000) {
    count % 375 == 0 ? printDot = true : undefined
   } else if(count<4000) {
    count % 375 == 0 ? printDot = true : undefined
   } else if(count<5000) {
    count % 250 == 0 ? printDot = true : undefined
   } else if(count<6000) {
    count % 180 == 0 ? printDot = true : undefined
   }else if(count<7000) {
    count % 180 == 0 ? printDot = true : undefined
   } else if(count<8000) {
    count % 180 == 0 ? printDot = true : undefined
   } else if(count<9000) {
    count % 170 == 0 ? printDot = true : undefined
   } else if (count % 250 == 0) {
    printDot = true
   }

   push();
   const xtmp = random(-20, 20)
   const ytmp = random(-20, 20)
   translate(radius, 0);
   if (printDot) {
    stroke (0)
    //stroke (random (0,255), random (0,255), random (0,255))
    //point(0,0);

    //fill(0)
    //fill(random (0,255), random (0,255), random (0,255));
    beginShape();
    for(let angleFrac = 0; angleFrac < 360; angleFrac += 15) {
      const radiusFrac = random(10, 20);
      const x = radiusFrac * cos(angleFrac);
      const y = radiusFrac * sin(angleFrac)*1.5;
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


  angle += angleOffset - angleReverse
  radius += radiusOffset * 0.05 + angleReverse

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