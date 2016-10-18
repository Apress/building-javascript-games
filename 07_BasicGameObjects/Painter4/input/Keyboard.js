"use strict";

function handleKeyDown(evt) {
    Keyboard.keyDown = evt.keyCode;
}

function handleKeyUp(evt) {
    Keyboard.keyDown = -1;
}

var Keyboard = { keyDown : -1 };

Keyboard.initialize = function () {
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
};