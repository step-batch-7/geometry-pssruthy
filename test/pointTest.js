'use strict';
const { assert } = require('chai');
const Point = require('./../src/point.js');
const Line = require('./../src/line');
const Circle = require('./../src/circle');

describe('Point', function() {
  describe('toString', () => {
    it('Should give the point representation', () => {
      const point = new Point(2, 3);
      assert.strictEqual(point.toString(), '[Point @(2,3)]');
    });
  });
  describe('visit', function() {
    it('Should give result of action on coordinates', () => {
      let point = new Point(2, 3);
      assert.strictEqual(
        point.visit((x, y) => x + y),
        5
      );
      point = new Point(2, 3);
      assert.strictEqual(
        point.visit((x, y) => x * y),
        6
      );
    });
  });
  describe('isEqualTo', function() {
    it('Should validate the point and the given parameter are equal', () => {
      const point = new Point(2, 3);
      const other = new Point(2, 3);
      assert.ok(point.isEqualTo(other));
    });
    it('Should invalidate the point and the given parameter are not equal', () => {
      const point = new Point(3, 4);
      let other = new Point(4, 5);
      assert.notOk(point.isEqualTo(other));
    });
    it('Should invalidate the point and the given parameter are different type instances', () => {
      const point = new Point(3, 4);
      const other = { x: 3, y: 4 };
      assert.notOk(point.isEqualTo(other));
    });
  });
  describe('clone', function() {
    it('Should give a copy of the point', () => {
      const point = new Point(2, 3);
      const pointCopy = new Point(2, 3);

      assert.deepStrictEqual(point.clone(), pointCopy);
    });
  });
  describe('findDistanceTo', () => {
    it('Should give distance between two points', () => {
      let point = new Point(1, 3);
      let other = new Point(1, 5);
      assert.strictEqual(point.findDistanceTo(other), 2);

      point = new Point(1, 2);
      other = new Point(2, 3);
      assert.approximately(point.findDistanceTo(other), 1.41, 0.1);
    });
    it('Should give NaN when given is not a number', () => {
      const point = new Point(1, 2);
      const other = { x: 2, y: 3 };
      assert.isNaN(point.findDistanceTo(other));
    });
    it('Should give zero when both points are same', () => {
      const point = new Point(1, 2);
      const other = new Point(1, 2);
      assert.strictEqual(point.findDistanceTo(other), 0);
    });
  });
  describe('isOn', function() {
    it('Should give true if the point is on the line ', function() {
      let point = new Point(1, 1);
      let line = new Line({ x: 0, y: 0 }, { x: 6, y: 6 });
      assert.isTrue(point.isOn(line));

      point = new Point(1.5, 1.5);
      line = new Line({ x: 0, y: 0 }, { x: 6, y: 6 });
      assert.isTrue(point.isOn(line));
    });
    it('Should give false if the point is not on the line ', function() {
      let point = new Point(3, 4);
      let line = new Line({ x: 0, y: 0 }, { x: 6, y: 6 });
      assert.isFalse(point.isOn(line));

      point = new Point(2.4, 1);
      line = new Line({ x: 2, y: 2 }, { x: 6, y: 6 });
      assert.isFalse(point.isOn(line));
    });
    it('Should validate if the point on the circle', () => {
      const circle = new Circle({ x: 2, y: 2 }, 2);
      const point = new Point(2, 4);
      assert.isTrue(point.isOn(circle));
    });
    it('Should invalidate if the point not on the circle', () => {
      const circle = new Circle({ x: 2, y: 2 }, 2);
      const point = new Point(2, 5);
      assert.isFalse(point.isOn(circle));
    });
  });
});
