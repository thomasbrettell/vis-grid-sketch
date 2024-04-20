export default class Vis4 {
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
    _scale,
    _rotation
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
    this.rotation = _rotation;

    this.x = this.xi * this.size + this.xOffset + this.margin;
    this.y = this.yi * this.size + this.yOffset + this.margin;

    this.initialSize = this.size;
    this.size = this.size * this.scale;

    this.innerSize = this.size - this.margin * 2;

    this.t = this.p.int(this.p.random(2024));
    this.tStep = this.p.random(0.2, 1.5);
    this.mhk = this.p.random(0.2, 0.01);
  }

  run() {
    this.draw();
    this.update();
  }

  draw() {
    this.p.push();
    this.p.translate(this.x, this.y);

    this.p.translate(this.innerSize / 2, this.innerSize / 2);
    this.p.rotate(this.rotation);
    this.p.translate(-this.innerSize / 2, -this.innerSize / 2);

    this.p.noFill();
    this.p.stroke(this.color);
    this.p.strokeWeight(this.initialSize * 0.01);
    this.p.square(0, 0, this.innerSize);

    this.p.pop();
  }

  update() {
    this.t += this.tStep;
  }
}
