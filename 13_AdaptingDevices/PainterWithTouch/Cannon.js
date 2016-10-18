"use strict";

function Cannon() {
    ThreeColorGameObject.call(this, sprites.cannon_red, sprites.cannon_green, sprites.cannon_blue);
    this.position = new Vector2(72, 405);
    this.origin = new Vector2(34, 34);
}

Cannon.prototype = Object.create(ThreeColorGameObject.prototype);

Object.defineProperty(Cannon.prototype, "colorSelectRectangle",
    {
        get: function () {
            return new Rectangle(this.position.x - this.origin.x, this.position.y - this.origin.y,
                sprites.cannon_barrel.height, sprites.cannon_barrel.height);
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
    if (Touch.isTouchDevice)
        this.handleInputTouch(delta);
    else
        this.handleInputMouse(delta);
};

Cannon.prototype.handleInputMouse = function (delta) {
    if (Keyboard.pressed(Keys.R))
        this.currentColor = this.colorRed;
    else if (Keyboard.pressed(Keys.G))
        this.currentColor = this.colorGreen;
    else if (Keyboard.pressed(Keys.B))
        this.currentColor = this.colorBlue;
    var opposite = Mouse.position.y - this.position.y;
    var adjacent = Mouse.position.x - this.position.x;
    this.rotation = Math.atan2(opposite, adjacent);
};

Cannon.prototype.handleInputTouch = function (delta) {
    var rect = this.colorSelectRectangle;
    if (Touch.containsTouchPress(rect)) {
        if (this.currentColor === this.colorRed)
            this.currentColor = this.colorGreen;
        else if (this.currentColor === this.colorGreen)
            this.currentColor = this.colorBlue;
        else
            this.currentColor = this.colorRed;
    } else if (Touch.isTouching && !Touch.containsTouch(rect)) {
        var touchPos = Touch.getPosition(0);
        var opposite = touchPos.y - this.position.y;
        var adjacent = touchPos.x - this.position.x;
        this.rotation = Math.atan2(opposite, adjacent);
    }
};

Cannon.prototype.draw = function () {
    if (!this.visible)
        return;
    var colorPosition = this.position.subtract(this.size.divideBy(2));
    Canvas2D.drawImage(sprites.cannon_barrel, this.position, this.rotation, 1, this.origin);
    Canvas2D.drawImage(this.currentColor, colorPosition);
};