"use strict";

var powerupjs = (function (powerupjs) {

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
                return new powerupjs.Vector2(this.x, this.y);
            }
        });

    Object.defineProperty(Rectangle.prototype, "size",
        {
            get: function () {
                return new powerupjs.Vector2(this.width, this.height);
            }
        });

    Rectangle.prototype.contains = function (v) {
        v = typeof v !== 'undefined' ? v : new powerupjs.Vector2();
        return (v.x >= this.left && v.x <= this.right &&
            v.y >= this.top && v.y <= this.bottom);
    };

    Rectangle.prototype.intersects = function (rect) {
        return (this.left <= rect.right && this.right >= rect.left &&
            this.top <= rect.bottom && this.bottom >= rect.top);
    };

    Rectangle.prototype.calculateIntersectionDepth = function (rect) {
        var minDistance = this.size.addTo(rect.size).divideBy(2);
        var distance = this.center.subtractFrom(rect.center);
        var depth = powerupjs.Vector2.zero;
        if (distance.x > 0)
            depth.x = minDistance.x - distance.x;
        else
            depth.x = -minDistance.x - distance.x;
        if (distance.y > 0)
            depth.y = minDistance.y - distance.y;
        else
            depth.y = -minDistance.y - distance.y;
        return depth;
    };

    Rectangle.prototype.intersection = function (rect) {
        var xmin = Math.max(this.left, rect.left);
        var xmax = Math.min(this.right, rect.right);
        var ymin = Math.max(this.top, rect.top);
        var ymax = Math.min(this.bottom, rect.bottom);
        return new powerupjs.Rectangle(xmin, ymin, xmax - xmin, ymax - ymin);
    };

    Rectangle.prototype.draw = function () {
        powerupjs.Canvas2D.drawRectangle(this.x, this.y, this.width, this.height);
    };

    powerupjs.Rectangle = Rectangle;
    return powerupjs;

})(powerupjs || {});