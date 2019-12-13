const Line = require('./../src/line.js');
const assert = require('assert');

describe('Line', function() {
  describe('toString', function() {
    it('Should give line representation', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 3 });
      const expectedValue = '(1,2)--(3,3)';
      assert.strictEqual(line.toString(), expectedValue);
    });
  });

  describe('isEqualTo', function() {
    it('Should give true when two lines are equal', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const newLine = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      assert.ok(line.isEqualTo(newLine));
    });
    it('Should give false when two lines are not equal', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const newLine = new Line({ x: 1, y: 4 }, { x: 9, y: 4 });
      assert.ok(!line.isEqualTo(newLine));
    });
    it('Should give false when they are instances of different class', () => {
      const line = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const newLine = { endA: { x: 2, y: 3 }, endB: { x: 4, y: 5 } };
      assert.ok(!line.isEqualTo(newLine));
    });
  });
});
