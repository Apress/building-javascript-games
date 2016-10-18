"use strict";

function JewelCart(sprite, layer, id) {
    SpriteGameObject.call(this, sprite, layer, id);
    this.push = 50;
    this.minxpos = 0;
    this.velocity = new Vector2(10, 0);
}

JewelCart.prototype = Object.create(SpriteGameObject.prototype);

JewelCart.prototype.update = function (delta) {
    SpriteGameObject.prototype.update.call(this, delta);
    this.push = Math.max(this.push - 0.00001, 1);
};

JewelCart.prototype.reset = function () {
    SpriteGameObject.prototype.reset.call(this);
    this.position.x = this.minxpos;
};

JewelCart.prototype.pushCart = function () {
    this.position.x = Math.max(this.position.x - this.push, this.minxpos);
};