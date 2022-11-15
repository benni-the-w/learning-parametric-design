const circleSize = 20;
let Farbe_1 = ("#800080")
let Farbe_2 = ("#ff8c00")
let Farbe_3 = ("#808080")



function preload(){
  // preload assets
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background (0);
  fill(Farbe_3);
  stroke(Farbe_1)
  strokeWeight(2)
  rectMode(CENTER)

  let x =0
  while (x <= 300) {
    let y =0
    while(y <=300) {
    circle (30 + x, 20 + y, circleSize);
    y += 80;
    }
    x += 60;

    if (x>=120) {
      stroke(Farbe_2);
    }
  }

  stroke(Farbe_2)
  let a =0
  while(a <= 300) {
    let b =0
    while(b <=300) {
    circle (0 + a, 60 + b, circleSize);
    b +=80;
    }
    a += 60;

    if (a>=120) {
      stroke(Farbe_1);
    }
  }

  fill(Farbe_1)
  stroke(Farbe_2)
  let m =0;
  while(m<= 300) {
  rect(75 + m, 400, 50, 50);
  m += 50;

  if(m%20=== 0) {
    fill(Farbe_1);
  } 
   else {
    fill (Farbe_3);
  }
  }

}
