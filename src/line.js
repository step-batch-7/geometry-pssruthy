const areCoordinatesEqual = function(pointA, pointB) {
  return pointA.x === pointB.x && pointA.y === pointB.y;
};

const areFromSameInstance = function(instanceA, instanceB) {
  return instanceA instanceof Line && instanceB instanceof Line;
};

class Line {
  constructor(endA, endB) {
    this.endA = { x: endA.x, y: endA.y };
    this.endB = { x: endB.x, y: endB.y };
  }

  toString() {
    const endA = `End A :(${this.endA.x},${this.endA.y})`;
    const endB = `End B :(${this.endB.x},${this.endB.y})`;

    return `The representation of the line is:\n${endA}\n${endB}`;
  }

  isEqualTo(newLine) {
    return (
      areFromSameInstance(this, newLine) &&
      areCoordinatesEqual(this.endA, newLine.endA) &&
      areCoordinatesEqual(this.endB, newLine.endB)
    );
  }
}

module.exports = Line;
