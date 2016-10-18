"use strict";

var cannon = {
};

cannon.initialize = function() {
    cannon.position = { x : 72, y : 405 };
    cannon.colorPosition =  { x : 55, y : 388 };
    cannon.origin = { x : 34, y : 34 };
    cannon.currentColor = sprites.cannon_red;
    cannon.rotation = 0;
};

cannon.handleInput = function (delta) {
    if (Keyboard.keyDown === Keys.R)
        cannon.currentColor = sprites.cannon_red;
    else if (Keyboard.keyDown === Keys.G)
        cannon.currentColor = sprites.cannon_green;
    else if (Keyboard.keyDown === Keys.B)
        cannon.currentColor = sprites.cannon_blue;
    var opposite = Mouse.position.y - cannon.position.y;
    var adjacent = Mouse.position.x - cannon.position.x;
    cannon.rotation = Math.atan2(opposite, adjacent);
};

cannon.update = function (delta) {
};

cannon.draw = function () {
    Canvas2D.drawImage(sprites.cannon_barrel, cannon.position, cannon.rotation, cannon.origin);
    Canvas2D.drawImage(cannon.currentColor, cannon.colorPosition, 0, { x : 0, y :  0 });
};

cannon.ballPosition = function() {
    var opposite = Math.sin(cannon.rotation) * sprites.cannon_barrel.width * 0.6;
    var adjacent = Math.cos(cannon.rotation) * sprites.cannon_barrel.width * 0.6;
    return { x : cannon.position.x + adjacent, y : cannon.position.y + opposite };
};