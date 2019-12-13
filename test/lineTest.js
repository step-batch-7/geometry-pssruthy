const Line = require('./../src/line.js');
const chai = require('chai');
const assert = chai.assert;

describe('Line', function() {
  describe('toString', function() {
    it('Should give line representation', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 3 });
      const expectedValue = 'Line : (1,2)-(3,3)';
      assert.strictEqual(line.toString(), expectedValue);
    });
  });

  describe('isEqualTo', function() {
    it('Should give true when two lines are equal', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const other = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      assert.ok(line.isEqualTo(other));
    });
    it('Should give false when two lines are not equal', function() {
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
  describe('length', function() {
    it('Should give zero when end points of the line are same', function() {
      const line = new Line({ x: 2, y: 3 }, { x: 2, y: 3 });
      assert.strictEqual(line.length, 0);
    });
    it('Should give length when end points of a line are positive numbers', () => {
      const line = new Line({ x: 6, y: 6 }, { x: 2, y: 3 });
      assert.strictEqual(line.length, 5);
    });
    it('Should give length when end points of a line are negative numbers', () => {
      const line = new Line({ x: -6, y: -6 }, { x: -2, y: -3 });
      assert.strictEqual(line.length, 5);
    });
    it('Should give length as floating point', () => {
      const line = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      assert.approximately(line.length, 1.4, 0.5);
    });
  });
  describe('slope', function() {
    it('Should give slope of a line when slope is positive', function() {
      const line = new Line({ x: 3, y: 2 }, { x: 7, y: 3 });
      assert.strictEqual(line.slope, 4);
    });
    it('Should give slope of a line when slope is negative', function() {
      const line = new Line({ x: 7, y: 2 }, { x: 3, y: 3 });
      assert.strictEqual(line.slope, -4);
    });
    it('Should give infinity when the line is parallel to x-axis', () => {
      const line = new Line({ x: 8, y: 3 }, { x: 3, y: 3 });
      assert.strictEqual(line.slope, -Infinity);
    });
    it('Should give zero when the line is parallel to y-axis', () => {
      const line = new Line({ x: 3, y: 9 }, { x: 3, y: 3 });
      assert.strictEqual(line.slope, 0);
    });
  });
});
