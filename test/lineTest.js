const Line = require('./../src/line.js');
const assert = require('assert');

describe('Line', function() {
  describe('toString', function() {
    it('Should give line representation', function() {
      const line = new Line(1, 2, 3, 3);
      const expectedValue = '(1,2)--(3,3)';
      assert.strictEqual(line.toString(), expectedValue);
    });
  });

  describe('isEqualTo', function() {
    it('Should give true when two lines are equal', function() {
      const line = new Line(1, 2, 3, 4);
      const newLine = new Line(1, 2, 3, 4);
      assert.ok(line.isEqualTo(newLine));
    });
    it('Should give false when two lines are not equal', function() {
      const line = new Line(1, 8, 3, 4);
      const newLine = new Line(1, 5, 5, 4);
      assert.ok(!line.isEqualTo(newLine));
    });
  });
});
