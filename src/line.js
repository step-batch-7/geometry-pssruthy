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

  isEqualTo(newLine) {
    if (!(newLine instanceof Line)) {
      return false;
    }
    return (
      areCoordinatesEqual(this.endA, newLine.endA) &&
      areCoordinatesEqual(this.endB, newLine.endB)
    );
  }
}

module.exports = Line;
