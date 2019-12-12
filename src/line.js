class Line {
  constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    this.point1 = { x1, y1 };
    this.point2 = { x2, y2 };
  }

  toString() {
    const { x1, y1 } = this.point1;
    const { x2, y2 } = this.point2;
    const pointOne = `End One :${x1},${y1}`;
    const pointTwo = `End Two :${x2},${y2}`;
    return `The representation of the line is:\n${pointOne}\n${pointTwo}`;
  }
  isEqualTo(newLine) {
    let isPointOneEqual = this.point1.x1 == newLine.point1.x1;
    isPointOneEqual = isPointOneEqual && this.point1.y1 == newLine.point1.y1;

    let isPointTwoEqual = this.point2.x2 == newLine.point2.x2;
    isPointTwoEqual = isPointTwoEqual && this.point2.y2 == newLine.point2.y2;

    return isPointTwoEqual && isPointOneEqual;
  }
}

module.exports = Line;
