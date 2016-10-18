"use strict";

function handleMouseMove(evt) {
    Mouse.position = { x : evt.pageX, y : evt.pageY };
}

function handleMouseDown(evt) {
    if (evt.which === 1) {
        if (!Mouse.leftDown)
            Mouse.leftPressed = true;
        Mouse.leftDown = true;
    }
}

function handleMouseUp(evt) {
    if (evt.which === 1)
        Mouse.leftDown = false;
}

var Mouse = {
    position : { x : 0, y : 0 },
    leftDown : false,
    leftPressed : false
};

Mouse.initialize = function () {
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
};

Mouse.reset = function() {
    Mouse.leftPressed = false;
};
