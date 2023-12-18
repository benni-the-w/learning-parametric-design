function preload(){
  // preload assets
}

function setup() {
  createCanvas(800, 800, SVG);
}

function draw(){
  background(255);

  // Draw 10 progressively spiky shapes inside each other with padding
  for(let i = 10; i >= 1; i--) {
    beginShape();
    for(let angle = 0; angle < 360; angle += 2.5) {
      const baseRadius = 30 * i + 50; // Adjust the initial radius and spacing as needed, with padding
      const randomFactor = random(1, 1.09); // Adjust the factor for spikiness

      const radius = baseRadius * randomFactor;
      const scaleX = 1;
      const scaleY = 0.8;
      const x = radius * scaleX * cos(radians(angle));
      const y = radius * scaleY * sin(radians(angle));
      vertex(x + width / 2, y + height / 2);
    }
    endShape(CLOSE);
  }

  noLoop();
  // save();
}