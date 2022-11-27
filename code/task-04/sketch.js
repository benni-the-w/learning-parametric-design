function preload(){
  // preload assets
  // https://gorillasun.de/blog/a-guide-to-hexagonal-grids-in-p5js
}

const sketchWidth = 400;
const sketchHeight = 400;

function setup(){
  L = (sketchHeight, sketchWidth)
  createCanvas(L, L)

  gridWidth = L 
  gridHeight = L 
  hexagonSize = L/10
}


function draw(){
  background(0);
  stroke(255);
  noFill();

  makeGrid()

}
function drawHexagon(cX, cY, r){
  beginShape()
  for(let a = 0; a < TAU; a+=TAU/6){
    vertex(cX + r * cos(a), cY + r * sin(a))
  }
  endShape(CLOSE)
}

function makeGrid(){
  count = 0
  for(y = 0; y < gridHeight; y+=hexagonSize/2.3){
    for(x = 0; x < gridWidth; x+=hexagonSize*1.5){
      drawHexagon(
        x+hexagonSize*(count%2==0)*0.75, 
        y, 
        hexagonSize/2
      )
    }
    count ++
  }

  noLoop()
}