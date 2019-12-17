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
}

module.exports = Rectangle;
