let Strive = {
    text: (s, x, y) => {
      scale(1, -1)
      text(s, x, -y)
      scale(1, -1)
    },
    randInt: (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    createTriangle: (p1, p2, p3, showLabels) => {
      let t = new Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, showLabels)
      t.draw()
      return t
    },
    drawTickAxes: (lineColor = 'rgb(20,45,217)', thickness = 3, spacing = 50, xoffset = 0, yoffset = 0, ) => {
      push();
      translate(xoffset, yoffset)
      for (let i = 0; i < height; i += spacing) {
  
        //vertical tickmarks
        stroke(lineColor)
        strokeWeight(thickness);
        line(5, i, -5, i)
        line(5, -i, -5, -i)
  
        //horizontal tickmarks
        line(i, +5, i, -5)
        line(-i, +5, -i, -5)
  
        fill("white")
        noStroke()
        text(i, 16, i)
        text(-i, 16, -i)
  
        text(i, i, 16)
        text(-i, -i, 16)
  
  
        strokeWeight(0.25)
        stroke(color('rgba(255,255,255,0.6)'))
        line(i, -height, i, height)
        line(-i, -height, -i, height)
  
        line(-width, i, width, i)
        line(-width, -i, width, -i)
  
  
      }
      stroke(lineColor)
      strokeWeight(5);
      //horizontal line
      line(-width, 0, width, 0)
      //vertical line
      line(0, height, 0, -height)
  
      pop();
    }
  }