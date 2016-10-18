"use strict";

function Turtle(layer, id) {
    powerupjs.AnimatedGameObject.call(this, layer, id);

    this.waitTime = 0;
    this.sneezing = false;

    this.loadAnimation(sprites.turtle_sneeze, "sneeze", false);
    this.loadAnimation(sprites.turtle_idle, "idle", true);
    this.playAnimation("idle");
    this.origin = new powerupjs.Vector2(this.width / 2, this.height);

    this.reset();
}

Turtle.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Turtle.prototype.reset = function () {
    this.waitTime = 5;
    this.sneezing = false;
};

Turtle.prototype.update = function (delta) {
    powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
    if (this.sneezing)
        this.playAnimation("sneeze");
    else
        this.playAnimation("idle");

    if (this.waitTime > 0)
        this.waitTime -= delta;
    else {
        this.sneezing = !this.sneezing;
        this.waitTime = 5;
    }
};
