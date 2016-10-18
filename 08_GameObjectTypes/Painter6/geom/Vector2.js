"use strict";

function Vector2(x, y) {
    this.x = typeof x !== 'undefined' ? x : 0;
    this.y = typeof y !== 'undefined' ? y : 0;
}

Vector2.prototype.addTo = function (v) {
    if (v.constructor === Vector2) {
        this.x += v.x;
        this.y += v.y;
    }
    else if (v.constructor === Number) {
        this.x += v;
        this.y += v;
    }
    return this;
};

Vector2.prototype.add = function (v) {
    var result = this.copy();
    return result.addTo(v);
};

Vector2.prototype.subtractFrom = function (v) {
    if (v.constructor === Vector2) {
        this.x -= v.x;
        this.y -= v.y;
    }
    else if (v.constructor === Number) {
        this.x -= v;
        this.y -= v;
    }
    return this;
};

Vector2.prototype.subtract = function (v) {
    var result = this.copy();
    return result.subtractFrom(v);
};

Vector2.prototype.divideBy = function (v) {
    if (v.constructor === Vector2) {
        this.x /= v.x;
        this.y /= v.y;
    }
    else if (v.constructor === Number) {
        this.x /= v;
        this.y /= v;
    }
    return this;
};

Vector2.prototype.divide = function (v) {
    var result = this.copy();
    return result.divideBy(v);
};

Vector2.prototype.multiplyWith = function (v) {
    if (v.constructor === Vector2) {
        this.x *= v.x;
        this.y *= v.y;
    }
    else if (v.constructor === Number) {
        this.x *= v;
        this.y *= v;
    }
    return this;
};

Vector2.prototype.multiply = function (v) {
    var result = this.copy();
    return result.multiplyWith(v);
};

Vector2.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")";
};

Vector2.prototype.normalize = function () {
    var length = this.length;
    if (length === 0)
        return;
    this.divideBy(length);
};

Vector2.prototype.copy = function () {
    return new Vector2(this.x, this.y);
};

Vector2.prototype.equals = function (obj) {
    return this.x === obj.x && this.y === obj.y;
};