function preload(){
  // preload assets
}
const sketchHeight = 400;
const sketchWidth = 400;

function setup() {
  createCanvas(sketchWidth, sketchHeight);
}

const radius = 100;

function draw() {
  background(0);
  fill("black");
  stroke("yellow");

  beginShape();
  for(let angle = 0; angle < 360; angle += 60) {
    const radius = 30
    const x = radius * cos(Math.PI / 180 * angle);
    const y = radius * sin(Math.PI / 180 * angle);
    vertex(x + sketchWidth / 2, y + sketchHeight / 2);

  for (let angle = 0; angle < 360; angle += 15) {
    push();
    const x = radius * cos(Math.PI / 180 * angle);
    const y = radius * sin(Math.PI / 180 * angle);

    translate(x, y);



    pop();
  }
  endShape(CLOSE);
  noLoop();
}

}