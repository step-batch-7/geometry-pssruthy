const Line = require('./../src/line.js');
const assert = require('assert');

describe('Line', function() {
  describe('toString', function() {
    it('Should give line representation', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 3 });
      const expectedValue = 'Line : (1,2)-(3,3)';
      assert.strictEqual(line.toString(), expectedValue);
    });
  });

  describe('isEqualTo', function() {
    it('Should give true when two lines are equal', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const other = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      assert.ok(line.isEqualTo(other));
    });
    it('Should give false when two lines are not equal', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const other = new Line({ x: 1, y: 4 }, { x: 9, y: 4 });
      assert.ok(!line.isEqualTo(other));
    });
    it('Should give false when they are not similar instances', () => {
      const line = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const other = { endA: { x: 2, y: 3 }, endB: { x: 4, y: 5 } };
      assert.ok(!line.isEqualTo(other));
    });
    it('Should invalidate when the other line object is empty', () => {
      const line = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const other = {};
      assert.ok(!line.isEqualTo(other));
    });
  });
});
