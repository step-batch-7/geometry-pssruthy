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

const areCollinearPoints = function(pointA, pointB, pointC) {
  const [x1, y1] = [pointA.x, pointA.y];
  const [x2, y2] = [pointB.x, pointB.y];
  const [x3, y3] = [pointC.x, pointC.y];
  return x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) == 0;
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
      (areCoordinatesEqual(this.endA, other.endA) &&
        areCoordinatesEqual(this.endB, other.endB)) ||
      (areCoordinatesEqual(this.endA, other.endB) &&
        areCoordinatesEqual(this.endB, other.endA))
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
    const slope = (y2 - y1) / (x2 - x1);
    return slope;
  }

  isParallelTo(other) {
    if (!(other instanceof Line)) return false;
    if (areCollinearPoints(this.endA, this.endB, other.endA)) return false;
    return this.slope == other.slope;
  }

  findY(x) {
    if (!isNumInRange([this.endA.x, this.endB.x], x)) return NaN;
    if (this.slope == Infinity || this.slope == -Infinity) return this.endA.y;
    return this.slope * x + getIntercept(this.endA, this.slope);
  }

  findX(y) {
    if (!isNumInRange([this.endA.y, this.endB.y], y)) return NaN;
    if (this.slope == 0) return this.endA.y;
    return y - getIntercept(this.endA, this.slope / this.slope);
  }

  split() {
    const lineMiddlePoint = getMiddlePoint(this.endA, this.endB);
    const lineFirstHalf = new Line(this.endA, lineMiddlePoint);
    const lineSecondHalf = new Line(lineMiddlePoint, this.endB);
    return [lineFirstHalf, lineSecondHalf];
  }

  hasPoint(other) {
    if (!(other instanceof Point)) return false;
    return this.findX(other.y) == other.x || this.findY(other.x) == other.y;
  }

  findPointFromStart(distance) {
    if (distance > this.length) return null;
    const ratio = distance / this.length;
    const xPoint = (1 - ratio) * this.endA.x + ratio * this.endB.x;
    const yPoint = (1 - ratio) * this.endA.y + ratio * this.endB.y;
    return new Point(xPoint, yPoint);
  }
  findPointFromEnd(distance) {
    if (distance > this.length) return null;
    const ratio = distance / this.length;
    const xPoint = ratio * this.endA.x + (1 - ratio) * this.endB.x;
    const yPoint = ratio * this.endA.y + (1 - ratio) * this.endB.y;
    return new Point(xPoint, yPoint);
  }
}

module.exports = Line;
