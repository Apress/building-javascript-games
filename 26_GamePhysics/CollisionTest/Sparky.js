"use strict";

function Sparky() {
    powerupjs.AnimatedGameObject.call(this);

    this.curr = "idle";
    this.loadAnimation(sprites.sparky_idle, "idle", true);
    this.loadAnimation(sprites.sparky_electrocute, "electrocute", true);

    this.playAnimation(this.curr);
    this.origin = new powerupjs.Vector2(this.width / 2, this.height);
}

Sparky.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Sparky.prototype.handleInput = function (delta) {
    if (powerupjs.Keyboard.pressed(powerupjs.Keys.space)) {
        if (this.curr === "electrocute")
            this.curr = "idle";
        else
            this.curr = "electrocute";
        this.playAnimation(this.curr)
    }
};