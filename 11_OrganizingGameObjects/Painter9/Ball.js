"use strict";

function Ball() {
    ThreeColorGameObject.call(this, sprites.ball_red, sprites.ball_green, sprites.ball_blue);
    this.shooting = false;
    this.reset();
}

Ball.prototype = Object.create(ThreeColorGameObject.prototype);

Ball.prototype.handleInput = function (delta) {
    if (Mouse.leftPressed && !this.shooting) {
        this.shooting = true;
        this.velocity = Mouse.position.subtract(this.position).multiplyWith(1.2);
    }
};

Ball.prototype.update = function (delta) {
    ThreeColorGameObject.prototype.update.call(this, delta);
    if (this.shooting) {
        this.velocity.x *= 0.99;
        this.velocity.y += 6;
    }
    else {
        this.color = Game.gameWorld.cannon.color;
        this.position = Game.gameWorld.cannon.ballPosition.subtractFrom(this.center);
    }
    if (Game.gameWorld.isOutsideWorld(this.position))
        this.reset();
};

Ball.prototype.reset = function () {
    this.position = new Vector2(65, 390);
    this.shooting = false;
};