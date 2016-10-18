"use strict";

function Ball() {
    this.position = new Vector2();
    this.velocity =  new Vector2();
    this.origin = new Vector2();
    this.currentColor = sprites.ball_red;
    this.shooting = false;
}

Ball.prototype.handleInput = function (delta) {
    if (Mouse.leftPressed && !this.shooting) {
        this.shooting = true;
        this.velocity = Mouse.position.subtract(this.position).multiplyWith(1.2);
    }
};

Ball.prototype.update = function (delta) {
    if (this.shooting) {
        this.velocity.x *= 0.99;
        this.velocity.y += 6;
        this.position.addTo(this.velocity.multiply(delta));
    }
    else {
        if (Game.gameWorld.cannon.currentColor === sprites.cannon_red)
            this.currentColor = sprites.ball_red;
        else if (Game.gameWorld.cannon.currentColor === sprites.cannon_green)
            this.currentColor = sprites.ball_green;
        else
            this.currentColor = sprites.ball_blue;
        var center = new Vector2(this.currentColor.width / 2, this.currentColor.height / 2);
        this.position = Game.gameWorld.cannon.ballPosition().subtractFrom(center);

    }
    if (Game.gameWorld.isOutsideWorld(this.position))
        this.reset();
};

Ball.prototype.reset = function () {
    this.position = new Vector2();
    this.shooting = false;
};

Ball.prototype.draw = function () {
    if (!this.shooting)
        return;
    Canvas2D.drawImage(this.currentColor, this.position, 0, this.origin);
};