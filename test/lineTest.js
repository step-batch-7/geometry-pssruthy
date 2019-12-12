const Line = require('./../src/line.js');
const assert = require('assert');

describe('Line', function() {
  describe('toString', function() {
    it('Should give line representation', function() {
      const line = new Line(1, 2, 2, 3);
      const expectedValue =
        'Two points of the line are:\nPoint One :1,2\nPoint Two :2,3';
      assert.strictEqual(line.toString(), expectedValue);
    });
    it('Should give default points when no points are specified', function() {
      const line = new Line();
      const expectedValue =
        'Two points of the line are:\nPoint One :0,0\nPoint Two :0,0';
      assert.strictEqual(line.toString(), expectedValue);
    });
  });

  describe('isEqualTo', function() {
    it('Should give true when two lines are equal', function() {
      const line = new Line(1, 2, 3, 4);
      const newLine = { point1: { x1: 1, y1: 2 }, point2: { x2: 3, y2: 4 } };
      assert.ok(line.isEqualTo(newLine));
    });
    it('Should give false when two lines are not equal', function() {
      const line = new Line(1, 8, 3, 4);
      const newLine = { point1: { x1: 1, y1: 2 }, point2: { x2: 3, y2: 4 } };
      assert.ok(!line.isEqualTo(newLine));
    });
  });
});
