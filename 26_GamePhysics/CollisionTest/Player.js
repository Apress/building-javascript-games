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
    this.position = powerupjs.Mouse.position;
};