"use strict";

function Rocket(moveToLeft, startPosition, layer, id) {
    powerupjs.AnimatedGameObject.call(this, layer, id);

    this.spawnTime = 0;
    this.startPosition = startPosition;
    this.mirror = moveToLeft;

    this.loadAnimation(sprites.rocket, "default", true, 0.5);
    this.playAnimation("default");
    this.origin = new powerupjs.Vector2(this.width / 2, this.height);

    this.reset();
}

Rocket.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Rocket.prototype.reset = function () {
    this.visible = false;
    this.position = this.startPosition.copy();
    this.velocity = powerupjs.Vector2.zero;
    this.spawnTime = Math.random() * 5;
};

Rocket.prototype.update = function (delta) {
    powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
    if (this.spawnTime > 0) {
        this.spawnTime -= delta;
        return;
    }
    this.visible = true;
    this.velocity.x = 600;
    if (this.mirror)
        this.velocity.x *= -1;
    // check if we are far enough outside the screen
    var screenBox = new powerupjs.Rectangle(-200, -200, powerupjs.Game.size.x + 400,
        powerupjs.Game.size.y + 400);
    if (!screenBox.intersects(this.boundingBox))
        this.reset();
    this.checkPlayerCollision();
};

Rocket.prototype.checkPlayerCollision = function () {
    var player = this.root.find(ID.player);
    if (this.collidesWith(player))
        player.die(false);
};