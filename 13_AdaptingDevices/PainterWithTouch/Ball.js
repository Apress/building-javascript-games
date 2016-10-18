"use strict";

function Ball() {
    ThreeColorGameObject.call(this, sprites.ball_red, sprites.ball_green, sprites.ball_blue);
    this.shooting = false;
    this.readyToShoot = false;
    this.lastTouchPosition = Vector2.zero;
    this.reset();
}

Ball.prototype = Object.create(ThreeColorGameObject.prototype);

Ball.prototype.handleInput = function (delta) {
    if (Touch.isTouchDevice)
        this.handleInputTouch(delta);
    else
        this.handleInputMouse(delta);
};

Ball.prototype.handleInputMouse = function (delta) {
    if (Mouse.left.pressed && !this.shooting) {
        this.shooting = true;
        this.velocity = Mouse.position.subtract(this.position).multiplyWith(1.2);
        sounds.shoot_paint.play();
    }
};

Ball.prototype.handleInputTouch = function (delta) {
    if (Touch.isTouching && !Touch.containsTouch(Game.gameWorld.cannon.colorSelectRectangle)) {
        this.lastTouchPosition = Touch.getPosition(0).copy();
        this.readyToShoot = true;
    }
    if (!Touch.isTouching && this.readyToShoot && !this.shooting) {
        this.shooting = true;
        this.readyToShoot = false;
        this.velocity = this.lastTouchPosition.subtract(this.position).multiplyWith(1.2);
        sounds.shoot_paint.play();
    }
};

Ball.prototype.update = function (delta) {
    if (this.shooting) {
        this.velocity.x *= 0.99;
        this.velocity.y += 6;
        ThreeColorGameObject.prototype.update.call(this, delta);
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