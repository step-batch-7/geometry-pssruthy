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
    it('Should validate when the point is on vertices', () => {
      let rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      let other = new Point(1, 1);
      assert.isTrue(rectangle.hasPoint(other));

      rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      other = new Point(3, 3);
      assert.isTrue(rectangle.hasPoint(other));

      rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      other = new Point(1, 3);
      assert.isTrue(rectangle.hasPoint(other));

      rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      other = new Point(3, 1);
      assert.isTrue(rectangle.hasPoint(other));
    });
    it('Should validate when the point is on the edge perpendicular to x axis', () => {
      let rectangle = new Rectangle({ x: 3, y: 6 }, { x: 7, y: 10 });
      let other = new Point(3, 8);
      assert.isTrue(rectangle.hasPoint(other));

      rectangle = new Rectangle({ x: 3, y: 6 }, { x: 7, y: 10 });
      other = new Point(7, 9);
      assert.isTrue(rectangle.hasPoint(other));
    });
    it('Should validate when the point is on the edge perpendicular to y axis', () => {
      let rectangle = new Rectangle({ x: 3, y: 6 }, { x: 7, y: 10 });
      let other = new Point(4, 6);
      assert.isTrue(rectangle.hasPoint(other));

      rectangle = new Rectangle({ x: 3, y: 6 }, { x: 7, y: 10 });
      other = new Point(4, 10);
      assert.isTrue(rectangle.hasPoint(other));
    });
    it('Should invalidate when the point is inside the rectangle', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      const other = new Point(2, 2);
      assert.isFalse(rectangle.hasPoint(other));
    });
    it('Should invalidate when the point is outside the rectangle', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      const other = new Point(4, 4);
      assert.isFalse(rectangle.hasPoint(other));
    });
  });
  describe('covers', () => {
    it('Should validate if point is inside the rectangle', () => {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.isTrue(rectangle.covers(new Point(2, 2)));

      rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      point = new Point(4, 3);
      assert.isTrue(rectangle.covers(point));
    });
    it('Should invalidate if point is outside the rectangle', () => {
      const rectangle = new Rectangle({ x: 0, y: 1 }, { x: 3, y: 4 });
      assert.isFalse(rectangle.covers(new Point(4, 4)));
    });
    it('Should invalidate if point is on rectangle perimeter', () => {
      const rectangle = new Rectangle({ x: 0, y: 1 }, { x: 3, y: 4 });
      assert.isFalse(rectangle.covers(new Point(0, 2)));
    });
    it('Should invalidate if point is not an instance of point', () => {
      const rectangle = new Rectangle({ x: 0, y: 1 }, { x: 3, y: 4 });
      assert.isFalse(rectangle.covers({ x: 1, y: 2 }));
    });
  });
});
