export default class Vis2 {
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

    console.log(this.rotation);

    this.x = this.xi * this.size + this.xOffset + this.margin;
    this.y = this.yi * this.size + this.yOffset + this.margin;

    this.initialSize = this.size;
    this.size = this.size * this.scale;

    this.innerSize = this.size - this.margin * 2;

    this.t = this.p.int(this.p.random(2024));
    this.tStep = this.p.random(0, 1);
    this.c = this.p.int(this.p.random(4, 8));
  }

  run() {
    this.draw();
    this.update();
  }

  draw() {
    this.p.push();
    this.p.translate(this.x, this.y);

    // rotate from center
    // bit hacky, probs a better way
    this.p.translate(this.innerSize / 2, this.innerSize / 2);
    this.p.rotate(this.rotation);
    this.p.translate(-this.innerSize / 2, -this.innerSize / 2);

    this.p.noFill();
    this.p.stroke(this.color);
    this.p.strokeWeight(this.initialSize * 0.01);
    this.p.square(0, 0, this.innerSize);

    const margin = this.innerSize * 0.02;
    const innerSize = this.innerSize - margin;

    for (let barI = 0; barI < this.c; barI++) {
      const width = innerSize / this.c - margin;
      const x = width * barI + margin * barI + margin;
      const height = this.p.noise(barI, this.t / 70) * innerSize - margin;

      this.color.setAlpha(100);
      this.p.fill(this.color);
      this.color.setAlpha(255);

      this.p.rect(x, margin, width, height);
    }
    // const rectWidth = innerSize / this.c;

    // for (let barI = 0; barI < this.c; barI++) {
    //   const x = barI * rectWidth;
    //   this.color.setAlpha(this.p.noise(x, this.t / 70) * 300);
    //   this.p.fill(this.color);

    //   this.p.rect(x + margin, margin, rectWidth, this.innerSize);

    //   this.color.setAlpha(255);
    // }

    // const ww = this.innerSize / this.c;

    // const w = innerww - mm / this.c;

    // for (let i = 0; i < this.c; i++) {
    //   const x = i * (ww + mm);
    //   this.p.square( , 0, mm, this.innerSize);
    // }

    this.p.pop();
  }

  update() {
    this.t += this.tStep = this.p.random(0.1, 1);
  }
}
