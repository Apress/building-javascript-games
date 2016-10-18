"use strict";

function SpriteGameObject(sprite, layer) {
    GameObject.call(this, layer);
    this.sprite = sprite;
    this.origin = Vector2.zero;
}

SpriteGameObject.prototype = Object.create(GameObject.prototype);

Object.defineProperty(SpriteGameObject.prototype, "size",
    {
        get: function () {
            return new Vector2(this.width, this.height);
        }
    });

Object.defineProperty(SpriteGameObject.prototype, "width",
    {
        get: function () {
            return this.sprite.width;
        }
    });

Object.defineProperty(SpriteGameObject.prototype, "height",
    {
        get: function () {
            return this.sprite.height;
        }
    });

SpriteGameObject.prototype.draw = function () {
    if (!this.visible)
        return;
    Canvas2D.drawImage(this.sprite, this.worldPosition, 0, 1, this.origin);
};