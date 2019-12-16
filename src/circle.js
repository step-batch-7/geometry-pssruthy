'use strict';
const Point = require('./point');

class Circle {
  constructor(center, radius) {
    this.center = new Point(center.x, center.y);
    this.radius = radius;
  }
  toString() {
    return `[Circle @(${this.center.x},${this.center.y}) radius ${this.radius}]`;
  }
  isEqualTo(other) {
    if (!(other instanceof Circle)) return false;
    const isCenterSame = this.center.isEqualTo(other.center);
    const isRadiusEqual = this.radius == other.radius;
    return isCenterSame && isRadiusEqual;
  }
  get area() {
    return Math.PI * this.radius ** 2;
  }
}

module.exports = Circle;
