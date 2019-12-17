'use strict';
const { assert } = require('chai');
const Rectangle = require('./../src/rectangle');
const Point = require('./../src/point');

describe('Rectangle', () => {
  describe('toString', () => {
    it('Should give rectangle representation of rectangle', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.strictEqual(rectangle.toString(), '[Rectangle (1,1) to (2,3)]');
    });
  });
  describe('area', () => {
    it('Should give the area of the rectangle', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 6, y: 3 });
      assert.strictEqual(rectangle.area, 10);
    });
    it('Should give the area of the rectangle when the width is zero', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 6, y: 1 });
      assert.strictEqual(rectangle.area, 0);
    });
    it('Should give the area of the rectangle when the length is zero', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 1, y: 6 });
      assert.strictEqual(rectangle.area, 0);
    });
    it('Should give the area of the rectangle when the length and width are zero', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 1, y: 1 });
      assert.strictEqual(rectangle.area, 0);
    });
  });
  describe('perimeter', () => {
    it('Should give the perimeter of the rectangle', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 6, y: 3 });
      assert.strictEqual(rectangle.perimeter, 14);
    });
    it('Should give the perimeter of the rectangle when the width is zero', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 6, y: 1 });
      assert.strictEqual(rectangle.perimeter, 10);
    });
    it('Should give the perimeter of the rectangle when the length is zero', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 1, y: 6 });
      assert.strictEqual(rectangle.perimeter, 10);
    });
    it('Should give the perimeter of the rectangle when the length and width are zero', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 1, y: 1 });
      assert.strictEqual(rectangle.perimeter, 0);
    });
  });
  describe('isEqualTo', () => {
    it('Should validate if both rectangles are on same coordinates', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 6 });
      const other = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 6 });
      assert.isTrue(rectangle.isEqualTo(other));
    });
    it('Should invalidate if both rectangles are on different coordinates', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 6 });
      const other = new Rectangle({ x: 3, y: 1 }, { x: 1, y: 1 });
      assert.isFalse(rectangle.isEqualTo(other));
    });
    it('Should invalidate if both rectangles are from different instances', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      const other = {
        vertexA: { x: 1, y: 1 },
        vertexB: { x: 3, y: 3 }
      };
      assert.isFalse(rectangle.isEqualTo(other));
    });
  });
  describe('hasPoint', () => {
    it('Should validate when the point is vertex', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      const other = new Point(1, 1);
      assert.isTrue(rectangle.hasPoint(other));
    });
  });
});
