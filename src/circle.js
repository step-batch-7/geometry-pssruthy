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
  get perimeter() {
    return 2 * Math.PI * this.radius;
  }
  hasPoint(other) {
    if (!(other instanceof Point)) return false;
    return other.findDistanceTo(this.center) == this.radius;
  }
  moveTo(point) {
    return new Circle(point, this.radius);
  }
  covers(point) {
    return point.findDistanceTo(this.center) < this.radius;
  }
}

module.exports = Circle;
