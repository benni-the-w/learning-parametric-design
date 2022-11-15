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


  fill(Farbe_1)
  stroke(Farbe_2)
  let r =0;
  while(r<= 300) {
  rect(125 + r, 350, 50, 50);
  r += 50;

  if(r%20=== 0) {
    fill(Farbe_1);
  } 
   else {
    fill (Farbe_3);
  }
  }

  fill(Farbe_1)
  stroke(Farbe_2)
  let o =0;
  while(o<= 300) {
  rect(175 + o, 300, 50, 50);
  o += 50;

  if(o%20=== 0) {
    fill(Farbe_1);
  } 
   else {
    fill (Farbe_3);
  }
  }

  fill(Farbe_1)
  stroke(Farbe_2)
  let p =0;
  while(p<= 300) {
  rect(225 + p, 250, 50, 50);
  p += 50;

  if(p%20=== 0) {
    fill(Farbe_1);
  } 
   else {
    fill (Farbe_3);
  }
  }

  fill(Farbe_1)
  stroke(Farbe_2)
  let u =0;
  while(u<= 300) {
  rect(275 + u, 200, 50, 50);
  u += 50;

  if(u%20=== 0) {
    fill(Farbe_1);
  } 
   else {
    fill (Farbe_3);
  }
  }

  fill(Farbe_1)
  stroke(Farbe_2)
  let t =0;
  while(t<= 300) {
  rect(325 + t, 150, 50, 50);
  t += 50;

  if(t%20=== 0) {
    fill(Farbe_1);
  } 
   else {
    fill (Farbe_3);
  }
  }

  fill(Farbe_1)
  stroke(Farbe_2)
  let h =0;
  while(h<= 300) {
  rect(375 + h, 100, 50, 50);
  h += 50;

  if(h%20=== 0) {
    fill(Farbe_1);
  } 
   else {
    fill (Farbe_3);
  }
  }

  strokeWeight (36);
  stroke(Farbe_2);
  line (50, 425, 425, 50);
  stroke(Farbe_3);
  line (0, 425, 425, 0);
  stroke(Farbe_1);
  line (-25, 400, 400, -25);
  stroke(Farbe_2);
  line (-25, 350, 350, -25);
}
