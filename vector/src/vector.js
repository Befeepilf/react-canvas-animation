import {sin, cos, pow, sqrt} from '@react-canvas-animation/math';
import {line} from '@react-canvas-animation/draw';

export default class Vector {
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
