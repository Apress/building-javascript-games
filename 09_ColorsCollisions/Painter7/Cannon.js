"use strict";

function Cannon() {
    this.position = new Vector2(72, 405);
    this.origin = new Vector2(34, 34);
    this.currentColor = sprites.cannon_red;
    this.rotation = 0;
}

Object.defineProperty(Cannon.prototype, "color",
    {
        get: function () {
            if (this.currentColor === sprites.cannon_red)
                return Color.red;
            else if (this.currentColor === sprites.cannon_green)
                return Color.green;
            else
                return Color.blue;
        },
        set: function (value) {
            if (value === Color.red)
                this.currentColor = sprites.cannon_red;
            else if (value === Color.green)
                this.currentColor = sprites.cannon_green;
            else if (value === Color.blue)
                this.currentColor = sprites.cannon_blue;
        }
    });

Object.defineProperty(Cannon.prototype, "width",
    {
        get: function () {
            return this.currentColor.width;
        }
    });

Object.defineProperty(Cannon.prototype, "height",
    {
        get: function () {
            return this.currentColor.height;
        }
    });

Object.defineProperty(Cannon.prototype, "size",
    {
        get: function () {
            return new Vector2(this.currentColor.width, this.currentColor.height);
        }
    });

Object.defineProperty(Cannon.prototype, "center",
    {
        get: function () {
            return new Vector2(this.currentColor.width / 2, this.currentColor.height / 2);
        }
    });

Object.defineProperty(Cannon.prototype, "ballPosition",
    {
        get: function () {
            var opposite = Math.sin(this.rotation) * sprites.cannon_barrel.width * 0.6;
            var adjacent = Math.cos(this.rotation) * sprites.cannon_barrel.width * 0.6;
            return new Vector2(this.position.x + adjacent, this.position.y + opposite);
        }
    });


Cannon.prototype.reset = function () {
    this.position = new Vector2(72, 405);
};

Cannon.prototype.handleInput = function (delta) {
    if (Keyboard.keyDown === Keys.R)
        this.color = Color.red;
    else if (Keyboard.keyDown === Keys.G)
        this.color = Color.green;
    else if (Keyboard.keyDown === Keys.B)
        this.color = Color.blue;
    var opposite = Mouse.position.y - this.position.y;
    var adjacent = Mouse.position.x - this.position.x;
    this.rotation = Math.atan2(opposite, adjacent);
};


Cannon.prototype.update = function (delta) {
};

Cannon.prototype.draw = function () {
    var colorPosition = this.position.subtract(this.size.divideBy(2));
    Canvas2D.drawImage(sprites.cannon_barrel, this.position, this.rotation, this.origin);
    Canvas2D.drawImage(this.currentColor, colorPosition);
};