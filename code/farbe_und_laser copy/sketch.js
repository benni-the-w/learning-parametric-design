function preload(){
  // preload assets
}

function setup() {
  createCanvas(800, 600, SVG); // Ändere die Canvas-Größe nach Bedarf
}

function draw(){
  background(255);
  beginShape();
  for(let angle = 0; angle < 360; angle += 2.5) {
    const radius = random(185, 210);

    // Scale factors for the oval shape
    const scaleX = 1.5; // Adjust this factor for horizontal scaling
    const scaleY = 1;   // Adjust this factor for vertical scaling

    const x = radius * scaleX * cos(radians(angle));
    const y = radius * scaleY * sin(radians(angle));
    vertex(x + width / 2, y + height / 2);
  }
  endShape(CLOSE);
  noLoop();
  // save();
}