const Point = require('./../src/point.js');
const { assert } = require('chai');

describe('Point', function() {
  describe('toString', () => {
    it('Should give the point representation', function() {
      const point = new Point(2, 3);
      assert.strictEqual(point.toString(), '[Point @(2,3)]');
    });
  });
});
