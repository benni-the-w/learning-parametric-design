function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);
  background (0);
}

function draw() {
  for(let x = canvasHeight; x >=1 ; x -=19){
    circleSize(canvasHeight/2, canvasWidth/2, radius-x);
    if (radius%2===0){
      fill("red";)
    }
  }

}
