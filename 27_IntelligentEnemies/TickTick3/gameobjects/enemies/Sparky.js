"use strict";

function Sparky(initialY, layer, id) {
    powerupjs.AnimatedGameObject.call(this, layer, id);

    this.idleTime = 0;
    this.yoffset = 0;
    this.initialY = initialY;

    this.loadAnimation(sprites.sparky_electrocute, "electrocute", false);
    this.loadAnimation(sprites.sparky_idle, "idle", true);
    this.playAnimation("idle");

    this.origin = new powerupjs.Vector2(this.width / 2, this.height);
    this.reset();
}

Sparky.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Sparky.prototype.reset = function () {
    this.idleTime = Math.random() * 5;
    this.position.y = this.initialY;
    this.yoffset = 120;
    this.velocity = powerupjs.Vector2.zero;
};

Sparky.prototype.update = function (delta) {
    powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
    if (this.idleTime <= 0) {
        this.playAnimation("electrocute");
        if (this.velocity.y != 0) {
            // falling down or going up
            this.yoffset -= this.velocity.y * delta;
            if (this.yoffset <= 0)
                this.velocity.y = 0;
            else if (this.yoffset >= 120)
                this.reset();
        }
        else if (this.animationEnded())
            this.velocity.y = -60;
    }
    else {
        this.playAnimation("idle");
        this.idleTime -= delta;
        if (this.idleTime <= 0)
            this.velocity.y = 300;
    }
};