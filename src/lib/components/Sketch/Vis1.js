export default class Vis1 {
  // what would be a better way for the class to acces p?
  constructor(
    _p,
    _xi,
    _yi,
    _size,
    _xOffset,
    _yOffset,
    _color,
    _margin,
    _scale
  ) {
    this.p = _p;
    this.xi = _xi;
    this.yi = _yi;
    this.size = _size;
    this.xOffset = _xOffset;
    this.yOffset = _yOffset;
    this.color = _color;
    this.margin = _margin;
    this.scale = _scale;

    this.x = this.xi * this.size + this.xOffset + this.margin;
    this.y = this.yi * this.size + this.yOffset + this.margin;

    this.initialSize = this.size;
    this.size = this.size * this.scale;

    this.innerSize = this.size - this.margin * 2;

    this.t = this.p.int(this.p.random(2024));
    this.tStep = this.p.random(0, 1);
    this.c = this.p.int(this.p.random(4, 9));
  }

  run() {
    this.draw();
    this.update();
  }

  draw() {
    this.p.push();
    this.p.translate(this.x, this.y);
    this.p.noFill();
    this.p.stroke(this.color);
    this.p.strokeWeight(this.initialSize * 0.01);
    this.p.square(0, 0, this.innerSize);

    const ww = this.innerSize / this.c;
    const mm = ww * 0.1;
    const innerww = ww - mm;

    for (let i = 0; i < this.c; i++) {
      for (let j = 0; j < this.c; j++) {
        const www = innerww - mm / this.c;
        const xx = i * (www + mm);
        const yy = j * (www + mm);
        this.color.setAlpha(this.p.noise(i, j, this.t / 70) * 300);
        this.p.fill(this.color);
        this.color.setAlpha(255);

        this.p.square(xx + mm, yy + mm, www);
      }
    }
    this.p.pop();
  }

  update() {
    this.t += this.tStep = this.p.random(0.1, 1);
  }
}
