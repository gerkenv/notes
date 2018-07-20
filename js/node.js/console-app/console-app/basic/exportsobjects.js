'use strict'

class Rectangle {
    constructor(h, w) {
        this.h = h;
        this.w = w;
    }
}

Rectangle.prototype.area = function () {
    return this.h * this.w;
}

class Square extends Rectangle {
    constructor(h) {
        super(h, h);
    }
}

// todo create node.js syntax basics
exports.Square = Square;
exports.Rectangle = Rectangle;

module.exports.sum = (a, b) => console.log(`Sum is ${a + b}`);