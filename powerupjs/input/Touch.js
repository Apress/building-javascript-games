"use strict";

var powerupjs = (function (powerupjs) {

    function handleTouchStart(evt) {
        evt.preventDefault();
        var touches = evt.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            powerupjs.Touch._touches.push(touches[i]);
            powerupjs.Touch._touchPresses.push(true);
        }
    }

    function handleTouchMove(evt) {
        evt.preventDefault();
        var touches = evt.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            var id = powerupjs.Touch.getTouchIndexFromId(touches[i].identifier);
            powerupjs.Touch._touches.splice(id, 1, touches[i]);
        }
    }

    function handleTouchEnd(evt) {
        evt.preventDefault();
        var touches = evt.changedTouches;
        for (var i = 0; i < touches.length; ++i) {
            var id = powerupjs.Touch.getTouchIndexFromId(touches[i].identifier);
            powerupjs.Touch._touches.splice(id, 1);
            powerupjs.Touch._touchPresses.splice(id, 1);
        }
    }

    function Touch_Singleton() {
        this._touches = [];
        this._touchPresses = [];
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchend', handleTouchEnd, false);
        document.addEventListener('touchcancel', handleTouchEnd, false);
        document.addEventListener('touchleave', handleTouchEnd, false);
        document.body.addEventListener('touchmove', handleTouchMove, false);
    }

    Object.defineProperty(Touch_Singleton.prototype, "nrTouches",
        {
            get: function () {
                return this._touches.length;
            }
        });

    Object.defineProperty(Touch_Singleton.prototype, "isTouching",
        {
            get: function () {
                return this._touches.length !== 0;
            }
        });

    Object.defineProperty(Touch_Singleton.prototype, "isTouchDevice",
        {
            get: function () {
                return ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0);
            }
        });

    Touch_Singleton.prototype.getTouchIndexFromId = function (id) {
        for (var i = 0, l = this._touches.length; i < l; ++i) {
            if (this._touches[i].identifier === id)
                return i;
        }
        return -1;
    };

    Touch_Singleton.prototype.reset = function () {
        for (var i = 0, l = this._touchPresses.length; i < l; ++i)
            this._touchPresses[i] = false;
    };

    Touch_Singleton.prototype.getPosition = function (index) {
        var canvasScale = powerupjs.Canvas2D.scale;
        var canvasOffset = powerupjs.Canvas2D.offset;
        var mx = (this._touches[index].pageX - canvasOffset.x) / canvasScale.x;
        var my = (this._touches[index].pageY - canvasOffset.y) / canvasScale.y;
        return new powerupjs.Vector2(mx, my);
    };

    Touch_Singleton.prototype.getIndexInRect = function (rect) {
        for (var i = 0, l = this._touches.length; i < l; ++i) {
            var pos = this.getPosition(i);
            if (rect.contains(pos))
                return i;
        }
        return powerupjs.Vector2.zero;
    };

    Touch_Singleton.prototype.containsTouch = function (rect) {
        for (var i = 0, l = this._touches.length; i < l; ++i) {
            if (rect.contains(this.getPosition(i)))
                return true;
        }
        return false;
    };

    Touch_Singleton.prototype.containsTouchPress = function (rect) {
        for (var i = 0, l = this._touches.length; i < l; ++i) {
            if (rect.contains(this.getPosition(i)) && this._touchPresses[i])
                return true;
        }
        return false;
    };

    powerupjs.Touch = new Touch_Singleton();
    return powerupjs;

})(powerupjs || {});