const sketchHeight = 800;
const sketchWidth = 800;

function setup() {
  createCanvas(sketchWidth, sketchHeight);
}

function draw(){
  background(255);
  beginShape();
  for(let angle = 0; angle < 360; angle += 5) {
    const radius = random(185, 205);
    const x = radius * cos(Math.PI / 180 * angle);
    const y = radius * sin(Math.PI / 180 * angle);
    vertex(x + sketchWidth / 2, y + sketchHeight / 2);
  }
  endShape(CLOSE);
  noLoop();
  save();
}