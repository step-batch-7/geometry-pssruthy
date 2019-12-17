'use strict';
const Point = require('./point');

class Rectangle {
  constructor(diagonalEndA, diagonalEndB) {
    this.diagonalEndA = new Point(diagonalEndA.x, diagonalEndA.y);
    this.diagonalEndB = new Point(diagonalEndB.x, diagonalEndB.y);
  }
  toString() {
    const endA = `${this.diagonalEndA.x},${this.diagonalEndA.y}`;
    const endB = `${this.diagonalEndB.x},${this.diagonalEndB.y}`;
    return `[Rectangle (${endA}) to (${endB})]`;
  }
  get area() {
    const width = Math.abs(this.diagonalEndA.y - this.diagonalEndB.y);
    const length = Math.abs(this.diagonalEndA.x - this.diagonalEndB.x);
    return width * length;
  }
}

module.exports = Rectangle;
