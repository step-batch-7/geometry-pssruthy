const arePointsEqual = function(point1, point2) {
  let areEqual = point1.x === point2.x;
  areEqual = areEqual && point1.y === point2.y;
  return areEqual;
};

class Line {
  constructor(x1, y1, x2, y2) {
    this.point1 = { x: x1, y: y1 };
    this.point2 = { x: x2, y: y2 };
  }

  toString() {
    const x1 = this.point1.x;
    const y1 = this.point1.y;
    const x2 = this.point2.x;
    const y2 = this.point2.y;

    const pointOne = `End One :${x1},${y1}`;
    const pointTwo = `End Two :${x2},${y2}`;
    return `The representation of the line is:\n${pointOne}\n${pointTwo}`;
  }

  isEqualTo(newLine) {
    const isPointOneEqual = arePointsEqual(this.point1, newLine.point1);
    const isPointTwoEqual = arePointsEqual(this.point2, newLine.point2);

    return isPointTwoEqual && isPointOneEqual;
  }
}

module.exports = Line;
