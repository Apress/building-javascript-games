"use strict";

function JewelCart(sprite, layer, id) {
    SpriteGameObject.call(this, sprite, layer, id);
    this.push = 50;
    this.minxpos = 0;
    this.velocity = new Vector2(10, 0);
    this.glitters = new GlitterField(2, 435, 75);
    this.glitters.position = new Vector2(275, 475);
    this.glitters.parent = this;
}

JewelCart.prototype = Object.create(SpriteGameObject.prototype);

JewelCart.prototype.update = function (delta) {
    SpriteGameObject.prototype.update.call(this, delta);
    this.push = Math.max(this.push - 0.00001, 1);
    this.glitters.update(delta);
};

JewelCart.prototype.reset = function () {
    SpriteGameObject.prototype.reset.call(this);
    this.position.x = this.minxpos;
};

JewelCart.prototype.draw = function () {
    SpriteGameObject.prototype.draw.call(this);
    this.glitters.draw();
};

JewelCart.prototype.pushCart = function () {
    this.position.x = Math.max(this.position.x - this.push, this.minxpos);
};