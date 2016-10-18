"use strict";

var sprites = {};

function handleKeyDown(evt) {
    Keyboard.keyDown = evt.keyCode;
}

function handleKeyUp(evt) {
    Keyboard.keyDown = -1;
}

function handleMouseMove(evt) {
    Mouse.position = { x : evt.pageX, y : evt.pageY };
}

function handleMouseDown(evt) {
    if (evt.which === 1)
        Mouse.leftDown = true;
}

function handleMouseUp(evt) {
    if (evt.which === 1)
        Mouse.leftDown = false;
}

var Keyboard = { keyDown : -1 };

var Keys = {
    A: 65,     B: 66,      C: 67,      D: 68,       E: 69,      F: 70,
    G: 71,     H: 72,      I: 73,      J: 74,       K: 75,      L: 76,
    M: 77,     N: 78,      O: 79,      P: 80,       Q: 81,      R: 82,
    S: 83,     T: 84,      U: 85,      V: 86,       W: 87,      X: 88,
    Y: 89,     Z: 90
};

var Mouse = {
    position : { x : 0, y : 0 },
    leftDown : false
};

var Canvas2D = {
    canvas : undefined,
    canvasContext : undefined
};

Canvas2D.initialize = function (canvasName) {
    Canvas2D.canvas = document.getElementById(canvasName);
    Canvas2D.canvasContext = Canvas2D.canvas.getContext('2d');
};

Canvas2D.clear = function () {
    Canvas2D.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Canvas2D.drawImage = function (sprite, position, rotation, origin) {
    Canvas2D.canvasContext.save();
    Canvas2D.canvasContext.translate(position.x, position.y);
    Canvas2D.canvasContext.rotate(rotation);
    Canvas2D.canvasContext.drawImage(sprite, 0, 0,
        sprite.width, sprite.height,
        -origin.x, -origin.y,
        sprite.width, sprite.height);
    Canvas2D.canvasContext.restore();
};

var cannon = {};

cannon.initialize = function() {
    cannon.position = { x : 72, y : 405 };
    cannon.colorPosition =  { x : 55, y : 388 };
    cannon.origin = { x : 34, y : 34 };
    cannon.currentColor = sprites.cannon_red;
    cannon.rotation = 0;
};

cannon.update = function () {
    if (Keyboard.keyDown === Keys.R)
        cannon.currentColor = sprites.cannon_red;
    else if (Keyboard.keyDown === Keys.G)
        cannon.currentColor = sprites.cannon_green;
    else if (Keyboard.keyDown === Keys.B)
        cannon.currentColor = sprites.cannon_blue;
    if (Mouse.leftDown) {
        var opposite = Mouse.position.y - this.position.y;
        var adjacent = Mouse.position.x - this.position.x;
        cannon.rotation = Math.atan2(opposite, adjacent);
    } else
        cannon.rotation = 0;
};

cannon.draw = function () {
    Canvas2D.drawImage(sprites.cannon_barrel, cannon.position, cannon.rotation, cannon.origin);
    Canvas2D.drawImage(cannon.currentColor, cannon.colorPosition, 0, { x : 0, y :  0 });
};

var Game = {};

Game.start = function () {
    Canvas2D.initialize("myCanvas");
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;

    var spriteFolder = "../../assets/Painter/sprites/";
    sprites.background = new Image();
    sprites.background.src = spriteFolder + "spr_background.jpg";
    sprites.cannon_barrel = new Image();
    sprites.cannon_barrel.src = spriteFolder + "spr_cannon_barrel.png";
    sprites.cannon_red = new Image();
    sprites.cannon_red.src = spriteFolder + "spr_cannon_red.png";
    sprites.cannon_green = new Image();
    sprites.cannon_green.src = spriteFolder + "spr_cannon_green.png";
    sprites.cannon_blue = new Image();
    sprites.cannon_blue.src = spriteFolder + "spr_cannon_blue.png";

    cannon.initialize();
    window.setTimeout(Game.mainLoop, 500);
};

document.addEventListener( 'DOMContentLoaded', Game.start);

Game.mainLoop = function() {
    Game.update();
    Game.draw();
    window.setTimeout(Game.mainLoop, 1000 / 60);
};

Game.update = function () {
    cannon.update();
};

Game.draw = function () {
    Canvas2D.clear();
    Canvas2D.drawImage(sprites.background, { x : 0, y : 0 }, 0, { x : 0, y : 0 });
    cannon.draw();
};