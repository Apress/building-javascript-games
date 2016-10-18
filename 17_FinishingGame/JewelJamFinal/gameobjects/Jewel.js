"use strict";

function Jewel(layer, id) {
    SpriteGameObject.call(this, sprites.jewels, layer, id);
    this.variation = Math.floor(Math.random() * 27);
}

Jewel.prototype = Object.create(SpriteGameObject.prototype);

Jewel.prototype.update = function (delta) {
    SpriteGameObject.prototype.update.call(this, delta);

    if (this.parent.dragging)
        return;
    var anchor = this.parent.getAnchorPosition(this);
    this.velocity = anchor.subtractFrom(this.position).multiplyWith(15);
};

Jewel.prototype.draw = function () {
    if (!this.visible)
        return;
    var imagePart = new Rectangle(this.variation * this.height, 0,
        this.height, this.height);
    Canvas2D.drawImage(this.sprite, this.worldPosition, 0, 1, this.origin, imagePart);
};