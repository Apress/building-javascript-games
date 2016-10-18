"use strict";

var powerupjs = (function (powerupjs) {

    function handleKeyDown(evt) {
        var code = evt.keyCode;
        if (code < 0 || code > 255)
            return;
        if (!powerupjs.Keyboard._keyStates[code].down)
            powerupjs.Keyboard._keyStates[code].pressed = true;
        powerupjs.Keyboard._keyStates[code].down = true;
    }

    function handleKeyUp(evt) {
        var code = evt.keyCode;
        if (code < 0 || code > 255)
            return;
        powerupjs.Keyboard._keyStates[code].down = false;
    }

    function Keyboard_Singleton() {
        this._keyStates = [];
        for (var i = 0; i < 256; ++i)
            this._keyStates.push(new powerupjs.ButtonState());
        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
    }

    Keyboard_Singleton.prototype.reset = function () {
        for (var i = 0; i < 256; ++i)
            this._keyStates[i].pressed = false;
    };

    Keyboard_Singleton.prototype.pressed = function (key) {
        return this._keyStates[key].pressed;
    };

    Keyboard_Singleton.prototype.down = function (key) {
        return this._keyStates[key].down;
    };

    powerupjs.Keyboard = new Keyboard_Singleton();
    return powerupjs;

})(powerupjs || {});
