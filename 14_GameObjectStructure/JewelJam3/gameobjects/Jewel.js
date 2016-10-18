"use strict";

function Jewel(layer) {
    var randomval = Math.floor(Math.random() * 3) + 1;
    var spr = sprites["single_jewel" + randomval];
    SpriteGameObject.call(this, spr, layer);
}

Jewel.prototype = Object.create(SpriteGameObject.prototype);

Jewel.prototype.update = function (delta) {
    SpriteGameObject.prototype.update.call(this, delta);

    if (this.parent.dragging)
        return;
    var anchor = this.parent.getAnchorPosition(this);
    this.velocity = anchor.subtractFrom(this.position).multiplyWith(15);
};