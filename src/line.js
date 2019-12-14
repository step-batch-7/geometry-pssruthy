'use strict';
const Point = require('./../src/point.js');

const areCoordinatesEqual = function(pointA, pointB) {
  return pointA.x === pointB.x && pointA.y === pointB.y;
};

const getIntercept = function(point, slope) {
  return point.y - slope * point.x;
};

const getMiddlePoint = function(pointA, pointB) {
  const middleX = (pointA.x + pointB.x) / 2;
  const middleY = (pointA.y + pointB.y) / 2;
  return { x: middleX, y: middleY };
};

const isNumInRange = function(ranges, num) {
  const [minRange, maxRange] = ranges.sort();
  return minRange <= num && maxRange >= num;
};

class Line {
  constructor(endA, endB) {
    this.endA = { x: endA.x, y: endA.y };
    this.endB = { x: endB.x, y: endB.y };
  }

  toString() {
    const endA = `(${this.endA.x},${this.endA.y})`;
    const endB = `(${this.endB.x},${this.endB.y})`;
    return `[Line ${endA} to ${endB}]`;
  }

  isEqualTo(other) {
    if (!(other instanceof Line)) return false;
    return (
      areCoordinatesEqual(this.endA, other.endA) &&
      areCoordinatesEqual(this.endB, other.endB)
    );
  }

  get length() {
    const [x1, y1] = [this.endA.x, this.endA.y];
    const [x2, y2] = [this.endB.x, this.endB.y];
    const lineLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return lineLength;
  }

  get slope() {
    const [x1, y1] = [this.endA.x, this.endA.y];
    const [x2, y2] = [this.endB.x, this.endB.y];
    const slope = (x2 - x1) / (y2 - y1);
    return slope;
  }

  isParallelTo(otherLine) {
    if (!(otherLine instanceof Line)) {
      return false;
    }
    const slopeA = this.slope;
    const slopeB = otherLine.slope;
    return slopeA == slopeB;
  }

  findY(x) {
    if (!isNumInRange([this.endA.x, this.endB.x], x)) return NaN;
    return this.slope * x + getIntercept(this.endA, this.slope);
  }

  findX(y) {
    if (!isNumInRange([this.endA.y, this.endB.y], y)) return NaN;
    return y - getIntercept(this.endA, this.slope / this.slope);
  }

  split() {
    const lineMiddlePoint = getMiddlePoint(this.endA, this.endB);
    const lineFirstHalf = new Line(this.endA, lineMiddlePoint);
    const lineSecondHalf = new Line(lineMiddlePoint, this.endB);
    return [lineFirstHalf, lineSecondHalf];
  }
}

module.exports = Line;
