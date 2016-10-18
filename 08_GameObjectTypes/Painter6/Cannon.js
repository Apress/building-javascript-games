"use strict";

function Cannon() {
    this.position = new Vector2(72, 405);
    this.colorPosition =  new Vector2(55, 388);
    this.origin = new Vector2(34, 34);
    this.currentColor = sprites.cannon_red;
    this.rotation = 0;
}

Cannon.prototype.reset = function () {
    this.position = new Vector2(72, 405);
};

Cannon.prototype.handleInput = function (delta) {
    if (Keyboard.keyDown === Keys.R)
        this.currentColor = sprites.cannon_red;
    else if (Keyboard.keyDown === Keys.G)
        this.currentColor = sprites.cannon_green;
    else if (Keyboard.keyDown === Keys.B)
        this.currentColor = sprites.cannon_blue;
    var opposite = Mouse.position.y - this.position.y;
    var adjacent = Mouse.position.x - this.position.x;
    this.rotation = Math.atan2(opposite, adjacent);
};

Cannon.prototype.update = function (delta) {
};

Cannon.prototype.draw = function () {
    Canvas2D.drawImage(sprites.cannon_barrel, this.position, this.rotation, this.origin);
    Canvas2D.drawImage(this.currentColor, this.colorPosition, 0, new Vector2());
};

Cannon.prototype.ballPosition = function() {
    var opposite = Math.sin(this.rotation) * sprites.cannon_barrel.width * 0.6;
    var adjacent = Math.cos(this.rotation) * sprites.cannon_barrel.width * 0.6;
    return new Vector2(this.position.x + adjacent, this.position.y + opposite);
};