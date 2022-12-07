const sketchWidth = 500;
const sketchHeight = 500;

const rectSize = 15;
const padding = 4;
const spacing = rectSize + 2 * padding;

const columns = Math.floor(sketchWidth / spacing);
const rows = Math.floor(sketchHeight / spacing);

let button; //Wie ändere ich Form und Größe? Brauche ich das let überhaupt?

function setup () {
  createCanvas(sketchWidth, sketchHeight);   

    button = createButton('Refresh');
    button.mousePressed(resetSketch);
    button.position(440, 520);
    //button.mousePressed (location.reload ());   
}

function draw () {
  fill (255); // Rechtecke
  if((mouseX, mouseY) >=500) {
    fill (1, 210, 210);
  }
  stroke (10, 20, 25);
  strokeWeight (2);
  background (90, 100, 250)

  for(let x = 0; x <= columns; x += 1) {
    for(let y = 0; y <= rows; y += 1) {
      rect(x * spacing, y * spacing, rectSize);

    }
    
  }
 
}
  function resetSketch(){
    createCanvas(sketchWidth, sketchHeight); 
    
  }