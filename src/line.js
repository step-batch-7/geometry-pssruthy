'use strict';
const Point = require('./../src/point.js');

const getMiddlePoint = function(pointA, pointB) {
  const middleX = (pointA.x + pointB.x) / 2;
  const middleY = (pointA.y + pointB.y) / 2;
  return { x: middleX, y: middleY };
};

const isNumInRange = function(ranges, num) {
  const [minRange, maxRange] = ranges.sort((a, b) => a - b);
  return minRange <= num && maxRange >= num;
};

const areCollinearPoints = function(pointA, pointB, pointC) {
  const [x1, y1] = [pointA.x, pointA.y];
  const [x2, y2] = [pointB.x, pointB.y];
  const [x3, y3] = [pointC.x, pointC.y];
  return x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) == 0;
};

const getPointOnLine = function(line, distance) {
  const ratio = distance / line.length;
  const xPoint = (1 - ratio) * line.endA.x + ratio * line.endB.x;
  const yPoint = (1 - ratio) * line.endA.y + ratio * line.endB.y;
  return new Point(xPoint, yPoint);
};

class Line {
  constructor(endA, endB) {
    this.endA = new Point(endA.x, endA.y);
    this.endB = new Point(endB.x, endB.y);
  }

  toString() {
    const endA = `(${this.endA.x},${this.endA.y})`;
    const endB = `(${this.endB.x},${this.endB.y})`;
    return `[Line ${endA} to ${endB}]`;
  }

  isEqualTo(other) {
    if (!(other instanceof Line)) return false;
    return (
      (this.endA.isEqualTo(other.endA) && this.endB.isEqualTo(other.endB)) ||
      (this.endA.isEqualTo(other.endB) && this.endB.isEqualTo(other.endA))
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
    return (x - this.endA.x) * this.slope + this.endA.y;
  }

  findX(y) {
    if (!isNumInRange([this.endA.y, this.endB.y], y)) return NaN;
    if (this.slope == 0) return this.endA.x;
    return this.endA.x + (y - this.endA.y) / this.slope;
  }

  split() {
    const lineMiddlePoint = getMiddlePoint(this.endA, this.endB);
    const lineFirstHalf = new Line(this.endA, lineMiddlePoint);
    const lineSecondHalf = new Line(lineMiddlePoint, this.endB);
    return [lineFirstHalf, lineSecondHalf];
  }

  hasPoint(other) {
    if (!(other instanceof Point)) return false;
    const isXInRange = isNumInRange([this.endA.x, this.endB.x], other.x);
    const isYInRange = isNumInRange([this.endA.y, this.endB.y], other.y);
    const isCollinear = areCollinearPoints(this.endA, this.endB, other);
    return isXInRange && isYInRange && isCollinear;
  }
  findPointFromStart(distance) {
    if (typeof distance != 'number') return null;
    if (distance > this.length || distance < 0) return null;
    return getPointOnLine(this, distance);
  }
  findPointFromEnd(distance) {
    if (typeof distance != 'number') return null;
    return this.findPointFromStart(this.length - distance);
  }
}
module.exports = Line;
