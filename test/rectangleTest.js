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
  });
});
