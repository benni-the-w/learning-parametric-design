function preload(){
  // preload assets
}

let Farbe1 = ("#808080")
let Farbe2 = ("#008080")


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(Farbe1);

    fill (Farbe2);
  beginShape();
  vertex(350, 50);
  vertex(350, 150);
  vertex(170, 320);
  vertex(50, 320);
  vertex(50, 220);
  vertex(230, 50);
  endShape (CLOSE);

    stroke(50);

  beginShape();
    vertex(50, 220); 
    bezierVertex(50, 220, 25, 170, -10, 260);
    endShape();

  beginShape();
    vertex(230, 50); 
    bezierVertex(230, 50, 20, 120, 70, 0);
    endShape();

  beginShape();
    vertex(350, 50); 
    bezierVertex(350, 50, 600, 100, 370, 250);
    endShape();
}