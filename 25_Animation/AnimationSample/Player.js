"use strict";

function Player() {
    powerupjs.AnimatedGameObject.call(this);

    this.loadAnimation(sprites.idle, "idle", true);
    this.loadAnimation(sprites.run, "run", true, 0.05);
    this.playAnimation("idle");

    this.origin = new powerupjs.Vector2(this.width / 2, this.height);
}

Player.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Player.prototype.handleInput = function (delta) {
    var walkingSpeed = 400;
    if (powerupjs.Keyboard.down(powerupjs.Keys.left))
        this.velocity.x = -walkingSpeed;
    else if (powerupjs.Keyboard.down(powerupjs.Keys.right))
        this.velocity.x = walkingSpeed;
    else
        this.velocity.x = 0;
    if (this.velocity.x != 0)
        this.mirror = this.velocity.x < 0;
};

Player.prototype.update = function (delta) {
    if (this.velocity.x === 0)
        this.playAnimation("idle");
    else
        this.playAnimation("run");
    powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
};