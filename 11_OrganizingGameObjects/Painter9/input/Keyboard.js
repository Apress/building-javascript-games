"use strict";

function handleKeyDown(evt) {
    Keyboard.keyDown = evt.keyCode;
}

function handleKeyUp(evt) {
    Keyboard.keyDown = -1;
}

function Keyboard_Singleton() {
    this.keyDown = -1;
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
}

Keyboard_Singleton.prototype.down = function (key) {
    return this.keyDown === key;
};

var Keyboard = new Keyboard_Singleton();