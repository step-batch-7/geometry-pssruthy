'use strict';
const { assert } = require('chai');
const Circle = require('./../src/circle');
const Point = require('./../src/point');

describe('Circle', () => {
  describe('toString', () => {
    it('Should give string representation', () => {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      assert.strictEqual(circle.toString(), '[Circle @(1,2) radius 5]');
    });
  });
  describe('isEqualTo', () => {
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
  describe('area', () => {
    it('Should give area of the circle', () => {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      assert.approximately(circle.area, 78.5, 0.1);
    });
    it('Should give area of the circle when the radius in zero', () => {
      const circle = new Circle({ x: 1, y: 2 }, 0);
      assert.strictEqual(circle.area, 0);
    });
  });
  describe('perimeter', () => {
    it('Should give perimeter of the circle', () => {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      assert.approximately(circle.perimeter, 31.4, 0.1);
    });
  });
  describe('hasPoint', () => {
    it('Should validate when the point is on the circle', () => {
      const circle = new Circle({ x: 0, y: 0 }, 2);
      const other = new Point(0, 2);
      assert.isTrue(circle.hasPoint(other));
    });
    it('Should invalidate when the point is not on the circle', () => {
      const circle = new Circle({ x: 0, y: 0 }, 2);
      const other = new Point(0, 8);
      assert.isFalse(circle.hasPoint(other));
    });
    it('Should invalidate when the given is not an instance of Point Class', () => {
      const circle = new Circle({ x: 0, y: 0 }, 2);
      const other = { x: 0, y: 2 };
      assert.isFalse(circle.hasPoint(other));
    });
  });
  describe('moveTo', () => {
    it('Should give a new circle of same dimensions at the given point', () => {
      const circle = new Circle({ x: 1, y: 1 }, 2);
      const movedCircle = new Circle({ x: 3, y: 2 }, 2);
      assert.deepStrictEqual(circle.moveTo({ x: 3, y: 2 }), movedCircle);
    });
  });
  describe('covers', () => {
    it('Should validate if the point is inside circle', () => {
      const circle = new Circle({ x: 1, y: 1 }, 3);
      const point = new Point(2, 2);
      assert.isTrue(circle.covers(point));
    });
    it('Should invalidate if the point is on circle circumference', () => {
      const circle = new Circle({ x: 1, y: 1 }, 3);
      const point = new Point(1, 4);
      assert.isFalse(circle.covers(point));
    });
    it('Should invalidate if the point outside circle', () => {
      const circle = new Circle({ x: 1, y: 1 }, 3);
      const point = new Point(1, 5);
      assert.isFalse(circle.covers(point));
    });
  });
});
