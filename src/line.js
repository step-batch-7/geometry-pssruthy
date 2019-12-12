class Line {
  constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    this.point1 = { x: x1, y: y1 };
    this.point2 = { x: x2, y: y2 };
  }

  toString() {
    const pointOne = `Point One :${this.point1.x},${this.point1.y}`;
    const pointTwo = `Point Two :${this.point2.x},${this.point2.y}`;
    return `${pointOne}\n${pointTwo}`;
  }
}

module.exports = Line;
