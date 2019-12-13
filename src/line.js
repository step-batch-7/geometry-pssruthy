const areCoordinatesEqual = function(pointA, pointB) {
  return pointA.x === pointB.x && pointA.y === pointB.y;
};

class Line {
  constructor(endA, endB) {
    this.endA = { x: endA.x, y: endA.y };
    this.endB = { x: endB.x, y: endB.y };
  }

  toString() {
    const endA = `(${this.endA.x},${this.endA.y})`;
    const endB = `(${this.endB.x},${this.endB.y})`;
    return `Line : ${endA}-${endB}`;
  }

  isEqualTo(other) {
    if (!(other instanceof Line)) {
      return false;
    }
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
}

module.exports = Line;
