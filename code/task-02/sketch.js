const circleSize = 20;
let Farbe_1 = ("#800080")
let Farbe_2 = ("#ff8c00")



function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background (100);
  fill(255);
  stroke(Farbe_1)
  strokeWeight(2)

  let x =1
  while (x <= 300) {
    let y =1
    while(y <=300) {
    circle (30 + x, 20 + y, circleSize);
    y += 80;
    }
    x += 60;

    if (x>=120) {
      stroke(Farbe_2);
    }
  }

  let a =1
  while(a <= 300) {
    let b =1
    while(b <=300) {
    circle (0 + a, 60 + b, circleSize);
    b +=80;
    }
    a += 60;
  }

  
}
