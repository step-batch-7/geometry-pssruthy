const areCoordinatesEqual = function(endA, endB) {
  let areEqual = endA.x === endB.x;
  areEqual = areEqual && endA.y === endB.y;
  return areEqual;
};

const areFromSameInstance = function(instanceA, instanceB) {
  return instanceA instanceof Line && instanceB instanceof Line;
};

class Line {
  constructor(endA, endB) {
    this.endA = { ...endA };
    this.endB = { ...endB };
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
