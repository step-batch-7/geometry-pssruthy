const areCoordinatesEqual = function(endA, endB) {
  let areEqual = endA.x === endB.x;
  areEqual = areEqual && endA.y === endB.y;
  return areEqual;
};

const areFromSameType = function(instanceA, instanceB) {
  return instanceA instanceof Line && instanceB instanceof Line;
};

class Line {
  constructor(endA, endB) {
    this.endA = endA;
    this.endB = endB;
  }

  toString() {
    const x1 = this.endA.x;
    const y1 = this.endA.y;
    const x2 = this.endB.x;
    const y2 = this.endB.y;

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return `(${x1},${y1})${'-'.repeat(length)}(${x2},${y2})`;
  }

  isEqualTo(newLine) {
    const isTypeEqual = areFromSameType(this, newLine);
    const isEndAEqual = areCoordinatesEqual(this.endA, newLine.endA);
    const isEndBEqual = areCoordinatesEqual(this.endB, newLine.endB);

    return isTypeEqual && isEndBEqual && isEndAEqual;
  }
}

module.exports = Line;
