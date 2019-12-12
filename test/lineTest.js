const Line = require('./../src/line.js');
const assert = require('assert');

describe('Line', function() {
  describe('toString', function() {
    it('Should give line representation', function() {
      const line = new Line(1, 2, 2, 3);
      assert.strictEqual(line.toString(), 'Point One :1,2\nPoint Two :2,3');
    });
    it('Should give default points when no points are specified', function() {
      const line = new Line();
      assert.strictEqual(line.toString(), 'Point One :0,0\nPoint Two :0,0');
    });
  });
});
