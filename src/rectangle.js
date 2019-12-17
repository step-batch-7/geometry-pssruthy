'use strict';
const Point = require('./point');

const getDimensions = function(diagonalEndA, diagonalEndB) {
  const width = Math.abs(diagonalEndA.y - diagonalEndB.y);
  const length = Math.abs(diagonalEndA.x - diagonalEndB.x);
  return { width, length };
};

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
    const dimensions = getDimensions(this.diagonalEndA, this.diagonalEndB);
    return dimensions.width * dimensions.length;
  }
  get perimeter() {
    const dimensions = getDimensions(this.diagonalEndA, this.diagonalEndB);
    return 2 * (dimensions.length + dimensions.width);
  }
  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    return (
      (this.diagonalEndA.isEqualTo(other.diagonalEndA) &&
        this.diagonalEndB.isEqualTo(other.diagonalEndB)) ||
      (this.diagonalEndA.isEqualTo(other.diagonalEndB) &&
        this.diagonalEndB.isEqualTo(other.diagonalEndA))
    );
  }
}

module.exports = Rectangle;
