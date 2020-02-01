let socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeCap(ROUND);
  strokeJoin(ROUND);
  cursor('none');

  socket = io();
  socket.on('stroke', on_stroke);
}

class Stroke {
  constructor(x, y) {
    this.pts = [[x, y]];
    this.col = '#000';
    this.lw = 2;
    this.id = socket.id;
  }
  add_point(x, y, force=false) {
    let L = this.pts.length;
    if (L == 0 || force || Math.hypot(this.pts[L - 1][0] - x, this.pts[L - 1][1] - y) > 2) {
      this.pts.push([x, y]);
    }
  }
}

let cur_stroke = null, drawing = [];
function draw() {
  background(255);
  for (let s of drawing) {
    stroke(s.col); strokeWeight(s.lw); noFill();
    beginShape();
    for (let p of s.pts) {
      vertex(...p);
    }
    endShape();
  }
  noStroke();
  fill(0);
  text(`FPS: ${frameRate()|0}`, 30, height-30);
  stroke(0); noFill();
  circle(mouseX, mouseY, 20);
  circle(mouseX, mouseY, 1);
}

function mousePressed() {
  if (mouseButton == 'left') {
    cur_stroke = new Stroke(mouseX, mouseY);
    drawing.push(cur_stroke);
  }
}

function mouseDragged() {
  if (cur_stroke) cur_stroke.add_point(mouseX, mouseY);
}

function mouseReleased() {
  if (mouseButton == 'left') {
    if (cur_stroke) {
      cur_stroke.add_point(mouseX, mouseY, true);
      socket.emit('stroke', cur_stroke);
      cur_stroke = null;
    }
  }
}

function on_stroke(s) {
  print('alert', s);
  if (s.id === socket.id) return;
  drawing.push(s);
}

function keyTyped() {
  if (key == 'z') drawing.pop();
  if (key == 'c') drawing = [];
  if (key == 'd') print(cur_stroke);

  console.log(key)
}
