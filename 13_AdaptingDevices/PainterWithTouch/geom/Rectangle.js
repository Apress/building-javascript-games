"use strict";

function Rectangle(x, y, w, h) {
    this.x = typeof x !== 'undefined' ? x : 0;
    this.y = typeof y !== 'undefined' ? y : 0;
    this.width = typeof w !== 'undefined' ? w : 1;
    this.height = typeof h !== 'undefined' ? h : 1;
}

Object.defineProperty(Rectangle.prototype, "left",
    {
        get: function () {
            return this.x;
        }
    });

Object.defineProperty(Rectangle.prototype, "right",
    {
        get: function () {
            return this.x + this.width;
        }
    });

Object.defineProperty(Rectangle.prototype, "top",
    {
        get: function () {
            return this.y;
        }
    });

Object.defineProperty(Rectangle.prototype, "bottom",
    {
        get: function () {
            return this.y + this.height;
        }
    });

Object.defineProperty(Rectangle.prototype, "center",
    {
        get: function () {
            return this.position.addTo(this.size.divideBy(2));
        }
    });

Object.defineProperty(Rectangle.prototype, "position",
    {
        get: function () {
            return new Vector2(this.x, this.y);
        }
    });

Object.defineProperty(Rectangle.prototype, "size",
    {
        get: function () {
            return new Vector2(this.width, this.height);
        }
    });

Rectangle.prototype.contains = function (v) {
    v = typeof v !== 'undefined' ? v : new Vector2();
    return (v.x >= this.left && v.x <= this.right &&
        v.y >= this.top && v.y <= this.bottom);
};