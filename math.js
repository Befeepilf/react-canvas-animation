import {line} from './draw.js';

function sin(a) {
  return Math.sin(a);
}

function arcsin(a) {
  return Math.asin(a);
}

function cos(a) {
  return Math.cos(a);
}

function arccos(a) {
  return Math.arccos(a);
}

function tan(a) {
  return Math.tan(a);
}

function arctan(a) {
  return Math.atan(a);
}

function sqrt(n) {
  return Math.sqrt(n);
}

function quad(b) {
  return Math.pow(b, 2);
}

function pow(b,e) {
  return Math.pow(b,e);
}

class Vector {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  mult(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  div(s) {
    this.x /= s;
    this.y /= s;
    return this;
  }

  mag() {
    return sqrt(pow(this.x, 2) + pow(this.y, 2));
  }

  setMag(m) {
    this.div(this.mag()).mult(m);
    return this;
  }

  rotate(a) {
    const oldX = this.x;
    const oldY = this.y;
    this.x = oldX * cos(a) - oldY * sin(a);
    this.y = oldX * sin(a) + oldY * cos(a);
    return this;
  }

  draw() {
    line(0, 0, this.x, this.y);
  }

  copy() {
    return new Vector(this.x, this.y);
  }
}

module.exports = {
  sin,
  arcsin,
  cos,
  arccos,
  tan,
  arctan,
  quad,
  sqrt,
  pow,
  Vector
};
