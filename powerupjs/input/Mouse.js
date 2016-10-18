"use strict";

var powerupjs = (function (powerupjs) {

    function handleMouseMove(evt) {
        var canvasScale = powerupjs.Canvas2D.scale;
        var canvasOffset = powerupjs.Canvas2D.offset;
        var mx = (evt.pageX - canvasOffset.x) / canvasScale.x;
        var my = (evt.pageY - canvasOffset.y) / canvasScale.y;
        powerupjs.Mouse._position = new powerupjs.Vector2(mx, my);
    }

    function handleMouseDown(evt) {
        handleMouseMove(evt);

        if (evt.which === 1) {
            if (!powerupjs.Mouse._left.down)
                powerupjs.Mouse._left.pressed = true;
            powerupjs.Mouse._left.down = true;
        } else if (evt.which === 2) {
            if (!powerupjs.Mouse._middle.down)
                powerupjs.Mouse._middle.pressed = true;
            powerupjs.Mouse._middle.down = true;
        } else if (evt.which === 3) {
            if (!powerupjs.Mouse._right.down)
                powerupjs.Mouse._right.pressed = true;
            powerupjs.Mouse._right.down = true;
        }
    }

    function handleMouseUp(evt) {
        handleMouseMove(evt);

        if (evt.which === 1)
            powerupjs.Mouse._left.down = false;
        else if (evt.which === 2)
            powerupjs.Mouse._middle.down = false;
        else if (evt.which === 3)
            powerupjs.Mouse._right.down = false;
    }

    function Mouse_Singleton() {
        this._position = powerupjs.Vector2.zero;
        this._left = new powerupjs.ButtonState();
        this._middle = new powerupjs.ButtonState();
        this._right = new powerupjs.ButtonState();
        document.onmousemove = handleMouseMove;
        document.onmousedown = handleMouseDown;
        document.onmouseup = handleMouseUp;
    }

    Object.defineProperty(Mouse_Singleton.prototype, "left",
        {
            get: function () {
                return this._left;
            }
        });

    Object.defineProperty(Mouse_Singleton.prototype, "middle",
        {
            get: function () {
                return this._middle;
            }
        });

    Object.defineProperty(Mouse_Singleton.prototype, "right",
        {
            get: function () {
                return this._right;
            }
        });

    Object.defineProperty(Mouse_Singleton.prototype, "position",
        {
            get: function () {
                return this._position;
            }
        });

    Mouse_Singleton.prototype.reset = function () {
        this._left.pressed = false;
        this._middle.pressed = false;
        this._right.pressed = false;
    };

    Mouse_Singleton.prototype.containsMouseDown = function (rect) {
        return this._left.down && rect.contains(this._position);
    };

    Mouse_Singleton.prototype.containsMousePress = function (rect) {
        return this._left.pressed && rect.contains(this._position);
    };

    powerupjs.Mouse = new Mouse_Singleton();
    return powerupjs;

})(powerupjs || {});
