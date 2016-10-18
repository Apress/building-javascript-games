"use strict";

function WaterDrop(layer, id) {
    powerupjs.SpriteGameObject.call(this, sprites.water, layer, id);
    this._bounce = 0;
}

WaterDrop.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

WaterDrop.prototype.update = function (delta) {
    this.position.y -= this._bounce;
    var t = powerupjs.Game.totalTime * 3 + this.position.x;
    this._bounce = Math.sin(t) * 5;
    this.position.y += this._bounce;
    powerupjs.SpriteGameObject.prototype.update.call(this, delta);

    var player = this.root.find(ID.player);
    if (this.collidesWith(player)) {
        this.visible = false;
        sounds.water_collected.play();
    }
};