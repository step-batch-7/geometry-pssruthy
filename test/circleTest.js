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
  describe('isEqualTo', function() {
    it('Should validate if both circles are at same location and are of same size', () => {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      const other = new Circle({ x: 1, y: 2 }, 5);
      assert.isTrue(circle.isEqualTo(other));
    });
    it('Should invalidate if both circles are at same location and different size', () => {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      const other = new Circle({ x: 1, y: 2 }, 3);
      assert.isFalse(circle.isEqualTo(other));
    });
    it('Should invalidate if both circles are different location and same size', () => {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      const other = new Circle({ x: 1, y: 3 }, 5);
      assert.isFalse(circle.isEqualTo(other));
    });
    it('Should invalidate if both circles are different location and different size', () => {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      const other = new Circle({ x: 1, y: 3 }, 2);
      assert.isFalse(circle.isEqualTo(other));
    });
    it('Should invalidate if both circles are different instances', () => {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      const other = { center: { x: 1, y: 2 }, radius: 5 };
      assert.isFalse(circle.isEqualTo(other));
    });
  });
});
