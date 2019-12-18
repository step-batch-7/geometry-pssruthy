'use strict';
const { assert } = require('chai');
const Line = require('./../src/line.js');
const Point = require('./../src/point.js');

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
      assert.isTrue(line.isEqualTo(other));
    });
    it('Should give false when two lines are not equal', () => {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const other = new Line({ x: 1, y: 4 }, { x: 9, y: 4 });
      assert.isTrue(!line.isEqualTo(other));
    });
    it('Should give false when they are not similar instances', () => {
      const line = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const other = { endA: { x: 2, y: 3 }, endB: { x: 4, y: 5 } };
      assert.isTrue(!line.isEqualTo(other));
    });
    it('Should invalidate when the other line object is empty', () => {
      const line = new Line({ x: 2, y: 3 }, { x: 4, y: 5 });
      const other = {};
      assert.isTrue(!line.isEqualTo(other));
    });
    it('Should give true when two lines are same but points order is reverse', () => {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const other = new Line({ x: 3, y: 4 }, { x: 1, y: 2 });
      assert.isTrue(line.isEqualTo(other));
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
      assert.strictEqual(line.slope, 0.25);
    });
    it('Should give slope of a line when slope is negative', () => {
      const line = new Line({ x: 7, y: 2 }, { x: 3, y: 3 });
      assert.strictEqual(line.slope, -0.25);
    });
    it('Should give infinity when the line is parallel to y-axis', () => {
      let line = new Line({ x: 3, y: 8 }, { x: 3, y: 6 });
      assert.strictEqual(line.slope, -Infinity);

      line = new Line({ x: 4, y: 3 }, { x: 4, y: 4 });
      assert.strictEqual(line.slope, Infinity);
    });
    it('Should give zero when the line is parallel to x-axis', () => {
      const line = new Line({ x: 5, y: 3 }, { x: 6, y: 3 });
      assert.strictEqual(line.slope, 0);
    });
  });

  describe('isParallelTo', () => {
    it('Should give true when two lines are parallel', () => {
      let line = new Line({ x: 5, y: 6 }, { x: 2, y: 3 });
      let otherLine = new Line({ x: 6, y: 4 }, { x: 4, y: 2 });
      assert.isTrue(line.isParallelTo(otherLine));

      line = new Line({ x: 1, y: 2 }, { x: -5, y: 4 });
      otherLine = new Line({ x: 1, y: 1 }, { x: 4, y: 0 });
      assert.isTrue(line.isParallelTo(otherLine));
    });
    it('Should give false when two lines are not parallel', () => {
      const line = new Line({ x: 4, y: 6 }, { x: 2, y: 3 });
      const otherLine = new Line({ x: 6, y: 4 }, { x: 9, y: 2 });
      assert.isFalse(line.isParallelTo(otherLine));
    });
    it('Should give false when two lines are overlapped', () => {
      const line = new Line({ x: 4, y: 6 }, { x: 2, y: 3 });
      const otherLine = new Line({ x: 4, y: 6 }, { x: 2, y: 3 });
      assert.isFalse(line.isParallelTo(otherLine));
    });
    it('Should give true when both lines are parallel to y axis', () => {
      const line = new Line({ x: 2, y: 5 }, { x: 2, y: 7 });
      const other = new Line({ x: 3, y: 0 }, { x: 3, y: 5 });
      assert.isTrue(line.isParallelTo(other));
    });
    it('Should give true when both lines are parallel to x axis', () => {
      const line = new Line({ x: 7, y: 7 }, { x: 5, y: 7 });
      const other = new Line({ x: 5, y: 0 }, { x: 3, y: 0 });
      assert.isTrue(line.isParallelTo(other));
    });
    it('Should invalidate when lines are from different instance', () => {
      const line = new Line({ x: 7, y: 7 }, { x: 5, y: 7 });
      const other = { endA: { x: 7, y: 7 }, endB: { x: 5, y: 7 } };
      assert.isFalse(line.isParallelTo(other));
    });
  });

  describe('findY', () => {
    it('Should give y coordinate for a given x coordinate on the line ', () => {
      let line = new Line({ x: 1, y: 1 }, { x: 5, y: 5 });
      assert.strictEqual(line.findY(4), 4);

      line = new Line({ x: 3, y: 5 }, { x: 2, y: 4 });
      assert.strictEqual(line.findY(2), 4);
    });
    it('Should give y coordinate for a given x coordinate is end of the line', () => {
      const line = new Line({ x: 1, y: 1 }, { x: 5, y: 5 });
      assert.strictEqual(line.findY(1), 1);
    });
    it('Should give NaN when the point is outside the Line Segment', () => {
      const line = new Line({ x: 3, y: 5 }, { x: 3, y: 4 });
      assert.isNaN(line.findY(4));
    });
    it('Should give a y coordinate when the line is perpendicular to x axis', () => {
      const line = new Line({ x: 3, y: 5 }, { x: 3, y: 1 });
      assert.strictEqual(line.findY(3), 5);
    });
  });

  describe('findX', () => {
    it('Should give x coordinate for a given y coordinate on the line', () => {
      const line = new Line({ x: 3, y: 3 }, { x: 5, y: 5 });
      assert.strictEqual(line.findX(4), 4);
    });
    it('Should give x coordinate for a given y coordinate is end of the line', () => {
      const line = new Line({ x: 1, y: 1 }, { x: 5, y: 5 });
      assert.strictEqual(line.findX(1), 1);
    });
    it('should give NaN when the point is outside of the line segment', () => {
      let line = new Line({ x: 0, y: 0 }, { x: 4, y: 4 });
      assert.isNaN(line.findX(5));

      line = new Line({ x: 3, y: 7 }, { x: 3, y: 3 });
      assert.isNaN(line.findX(4));
    });
    it('Should give a x coordinate when the line is perpendicular to y axis', () => {
      const line = new Line({ x: 3, y: 5 }, { x: 9, y: 5 });
      assert.strictEqual(line.findX(5), 3);
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
  describe('hasPoint', () => {
    it('Should validate the point is on the line', () => {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      const point = new Point(2, 2);
      assert.isTrue(line.hasPoint(point));
    });
    it('Should invalidate the point is not on the line', () => {
      const line = new Line({ x: 3, y: 4 }, { x: 1, y: 5 });
      const point = new Point(8, 2);
      assert.isFalse(line.hasPoint(point));
    });
    it('Should invalidate the point is not an instance of Point class', () => {
      let line = new Line({ x: 3, y: 3 }, { x: 7, y: 7 });
      let point = { x: 4, y: 4 };
      assert.isFalse(line.hasPoint(point));

      line = new Line({ x: 3, y: 7 }, { x: 3, y: 3 });
      point = {};
      assert.isFalse(line.hasPoint(point));
    });
    it('Should give true when the point is perpendicular to y axis', () => {
      const line = new Line({ x: 1, y: 8 }, { x: 3, y: 8 });
      const point = new Point(2, 8);
      assert.isTrue(line.hasPoint(point));
    });
    it('Should give true when the point is perpendicular to x axis', () => {
      const line = new Line({ x: 3, y: 1 }, { x: 3, y: 8 });
      const point = new Point(3, 5);
      assert.isTrue(line.hasPoint(point));
    });
  });
  describe('findPointFromStart', () => {
    it('Should give a point at a distance from the start of line', () => {
      const line = new Line({ x: 1, y: 3 }, { x: 1, y: 8 });
      const point = new Point(1, 5);
      assert.deepStrictEqual(line.findPointFromStart(2), point);
    });
    it('Should give null when the distance is larger than the line', () => {
      const line = new Line({ x: 1, y: 3 }, { x: 1, y: 8 });
      assert.isNull(line.findPointFromStart(10));
    });
  });
  describe('findPointFromEnd', () => {
    it('Should give a point at a distance from the end of line', () => {
      const line = new Line({ x: 1, y: 3 }, { x: 1, y: 8 });
      const point = new Point(1, 6);
      assert.deepStrictEqual(line.findPointFromEnd(2), point);
    });
    it('Should give null when the distance is larger than the line', () => {
      const line = new Line({ x: 1, y: 3 }, { x: 1, y: 8 });
      assert.isNull(line.findPointFromEnd(10));
    });
  });
});
