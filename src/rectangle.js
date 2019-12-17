'use strict';
const Point = require('./point');
const Line = require('./Line');

const getDimensions = function(vertexA, vertexC) {
  const width = Math.abs(vertexA.y - vertexC.y);
  const length = Math.abs(vertexA.x - vertexC.x);
  return { width, length };
};

class Rectangle {
  constructor(vertexA, vertexC) {
    this.vertexA = new Point(vertexA.x, vertexA.y);
    this.vertexC = new Point(vertexC.x, vertexC.y);
  }
  toString() {
    const endA = `${this.vertexA.x},${this.vertexA.y}`;
    const endB = `${this.vertexC.x},${this.vertexC.y}`;
    return `[Rectangle (${endA}) to (${endB})]`;
  }
  get area() {
    const dimensions = getDimensions(this.vertexA, this.vertexC);
    return dimensions.width * dimensions.length;
  }
  get perimeter() {
    const dimensions = getDimensions(this.vertexA, this.vertexC);
    return 2 * (dimensions.length + dimensions.width);
  }
  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    return (
      (this.vertexA.isEqualTo(other.vertexA) &&
        this.vertexC.isEqualTo(other.vertexC)) ||
      (this.vertexA.isEqualTo(other.vertexC) &&
        this.vertexC.isEqualTo(other.vertexA))
    );
  }
}

module.exports = Rectangle;
