"use strict";

function handleMouseMove(evt) {
    Mouse.position = new Vector2(evt.pageX, evt.pageY);
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

function Mouse_Singleton() {
    this.position = new Vector2();
    this.leftDown = false;
    this.leftPressed = false;
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
}

Mouse_Singleton.prototype.reset = function () {
    this.leftPressed = false;
};

var Mouse = new Mouse_Singleton();
