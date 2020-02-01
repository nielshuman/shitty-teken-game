function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeCap(ROUND);
  strokeJoin(ROUND);
}

class Stroke {
  constructor(x, y) {
    this.pts = [createVector(x, y)];
    this.col = '#000';
    this.lw = 2
  }
  add_point(x, y) {
    this.pts.push(createVector(x, y));
  }
}

let cur_stroke = null, drawing = [];
function draw() {
  background(255);
  for (let s of drawing) {
    stroke(s.col); strokeWeight(s.lw); noFill();
    beginShape();
    for (let p of s.pts) {
      vertex(p.x, p.y);
    }
    endShape();  
  }
  noStroke();
  fill(0);
  text(`FPS: ${frameRate()|0}`, 30, height-30)
}

function mousePressed() {
  cur_stroke = new Stroke(mouseX, mouseY);
  drawing.push(cur_stroke);
}

function mouseDragged() {
  if (cur_stroke) cur_stroke.add_point(mouseX, mouseY);
}

function mouseReleased() {
  if (cur_stroke) cur_stroke.add_point(mouseX, mouseY);
  cur_stroke = null;
}

function keyTyped() {
  if (key == 'z') drawing.pop();
  if (key == 'ctrl') drawing = [];
  console.log(key)
}