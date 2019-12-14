'use strict';

const Line = require('./../src/line.js');
const { assert } = require('chai');

describe('Line', () => {
  describe('toString', () => {
    it('Should give line representation', () => {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 3 });
      const expectedValue = '[Line (1,2) to (3,3)]';
      assert.strictEqual(line.toString(), expectedValue);
    });
  });

  describe('isEqualTo', () => {
    it('Should give true when two lines are equal', () => {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const other = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      assert.ok(line.isEqualTo(other));
    });
    it('Should give false when two lines are not equal', () => {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const other = new Line({ x: 1, y: 4 }, { x: 9, y: 4 });
      assert.ok(!line.isEqualTo(other));
    });
    it('Should give false when they are not similar instances', () => {
      const line = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const other = { endA: { x: 2, y: 3 }, endB: { x: 4, y: 5 } };
      assert.ok(!line.isEqualTo(other));
    });
    it('Should invalidate when the other line object is empty', () => {
      const line = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const other = {};
      assert.ok(!line.isEqualTo(other));
    });
  });

  describe('length', () => {
    it('Should give zero when end points of the line are same', () => {
      const line = new Line({ x: 2, y: 3 }, { x: 2, y: 3 });
      assert.strictEqual(line.length, 0);
    });
    it('Should give length when end points of a line coordinates are positive numbers', () => {
      const line = new Line({ x: 6, y: 6 }, { x: 2, y: 3 });
      assert.strictEqual(line.length, 5);
    });
    it('Should give length when end points of a line coordinates are negative numbers', () => {
      const line = new Line({ x: -6, y: -6 }, { x: -2, y: -3 });
      assert.strictEqual(line.length, 5);
    });
    it('Should give length as floating point', () => {
      const line = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      assert.approximately(line.length, 1.4, 0.5);
    });
  });

  describe('slope', () => {
    it('Should give slope of a line when slope is positive', () => {
      const line = new Line({ x: 3, y: 2 }, { x: 7, y: 3 });
      assert.strictEqual(line.slope, 4);
    });
    it('Should give slope of a line when slope is negative', () => {
      const line = new Line({ x: 7, y: 2 }, { x: 3, y: 3 });
      assert.strictEqual(line.slope, -4);
    });
    it('Should give infinity when the line is parallel to y-axis', () => {
      let line = new Line({ x: 8, y: 3 }, { x: 3, y: 3 });
      assert.strictEqual(line.slope, -Infinity);

      line = new Line({ x: 3, y: 3 }, { x: 8, y: 3 });
      assert.strictEqual(line.slope, Infinity);
    });
    it('Should give zero when the line is parallel to x-axis', () => {
      const line = new Line({ x: 3, y: 9 }, { x: 3, y: 3 });
      assert.strictEqual(line.slope, 0);
    });
  });

  describe('isParallelTo', () => {
    it('Should give true when two lines are parallel', () => {
      let line = new Line({ x: 5, y: 6 }, { x: 2, y: 3 });
      let otherLine = new Line({ x: 6, y: 4 }, { x: 4, y: 2 });
      assert.ok(line.isParallelTo(otherLine));

      line = new Line({ x: 1, y: 2 }, { x: -5, y: 4 });
      otherLine = new Line({ x: 1, y: 1 }, { x: 4, y: 0 });
      assert.ok(line.isParallelTo(otherLine));
    });
    it('Should give false when two lines are not parallel', () => {
      const line = new Line({ x: 4, y: 6 }, { x: 2, y: 3 });
      const otherLine = new Line({ x: 6, y: 4 }, { x: 9, y: 2 });
      assert.notOk(line.isParallelTo(otherLine));
    });
  });

  describe('findY', () => {
    it('Should give y coordinate for a given x coordinate on the line ', () => {
      let line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.strictEqual(line.findY(4), 4);

      line = new Line({ x: 3, y: 5 }, { x: 2, y: 4 });
      assert.strictEqual(line.findY(2), 4);
    });
  });

  describe('findX', () => {
    it('Should give x coordinate for a given y coordinate on the line', () => {
      const line = new Line({ x: 3, y: 5 }, { x: 2, y: 4 });
      assert.strictEqual(line.findX(4), 2);
    });
  });

  describe('split', () => {
    it('Should give two line instance by splitting the line into two', () => {
      let line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      let lineFirstHalf = new Line({ x: 1, y: 1 }, { x: 2, y: 2 });
      let lineSecondHalf = new Line({ x: 2, y: 2 }, { x: 3, y: 3 });
      assert.deepStrictEqual(line.split(), [lineFirstHalf, lineSecondHalf]);

      line = new Line({ x: 3, y: 1 }, { x: 8, y: 3 });
      lineFirstHalf = new Line({ x: 3, y: 1 }, { x: 5.5, y: 2 });
      lineSecondHalf = new Line({ x: 5.5, y: 2 }, { x: 8, y: 3 });
      assert.deepStrictEqual(line.split(), [lineFirstHalf, lineSecondHalf]);
    });
  });
});
