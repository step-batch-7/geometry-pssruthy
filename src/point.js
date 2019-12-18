'use strict';

const areCoordinatesEqual = function(pointA, pointB) {
  return pointA.x === pointB.x && pointA.y === pointB.y;
};

class Point {
  constructor(x, y) {
    [this.x, this.y] = [x, y];
  }

  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }

  visit(action) {
    return action(this.x, this.y);
  }

  isEqualTo(other) {
    if (!(other instanceof Point)) return false;
    return areCoordinatesEqual(this, other);
  }

  clone() {
    return new Point(this.x, this.y);
  }
  findDistanceTo(other) {
    if (!(other instanceof Point)) return NaN;
    const xDiff = this.x - other.x;
    const yDiff = this.y - other.y;
    return Math.sqrt(xDiff ** 2 + yDiff ** 2);
  }

  isOn(shape) {
    return shape.hasPoint(this);
  }
}
module.exports = Point;
