"use strict";

var powerupjs = (function (powerupjs) {
    function ButtonState() {
        this.down = false;
        this.pressed = false;
    }

    powerupjs.ButtonState = ButtonState;
    return powerupjs;

})(powerupjs || {});