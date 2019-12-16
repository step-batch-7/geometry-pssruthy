'use strict';
const { assert } = require('chai');
const Circle = require('./../src/circle');
describe('Circle', () => {
  describe('toString', function() {
    it('Should give string representation', () => {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      assert.strictEqual(circle.toString(), '[Circle @(1,2) radius 5]');
    });
  });
});
