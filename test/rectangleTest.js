'use strict';
const { assert } = require('chai');
const Rectangle = require('./../src/rectangle');

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
});
