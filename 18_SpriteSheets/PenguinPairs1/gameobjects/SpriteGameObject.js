"use strict";

function SpriteGameObject(sprite, layer, id) {
    GameObject.call(this, layer, id);

    this.sprite = sprite;
    this.origin = Vector2.zero;
    this._sheetIndex = 0;
}

SpriteGameObject.prototype = Object.create(GameObject.prototype);

Object.defineProperty(SpriteGameObject.prototype, "size",
    {
        get: function () {
            return this.sprite.size;
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

Object.defineProperty(SpriteGameObject.prototype, "center",
    {
        get: function () {
            return this.sprite.center;
        }
    });

Object.defineProperty(SpriteGameObject.prototype, "sheetIndex",
    {
        get: function () {
            return this._sheetIndex;
        },
        set: function (value) {
            if (value >= 0 && value < this.sprite.nrSheetElements)
                this._sheetIndex = value;
        }
    });

Object.defineProperty(SpriteGameObject.prototype, "screenCenterX",
    {
        get: function () {
            return (Game.size.x - this.width) / 2 + this.origin.x;
        }
    });

Object.defineProperty(SpriteGameObject.prototype, "screenCenterY",
    {
        get: function () {
            return (Game.size.y - this.height) / 2 + this.origin.y;
        }
    });

Object.defineProperty(SpriteGameObject.prototype, "screenCenter",
    {
        get: function () {
            return Game.size.subtract(this.size).divideBy(2).addTo(this.origin);
        }
    });

Object.defineProperty(SpriteGameObject.prototype, "boundingBox",
    {
        get: function () {
            var leftTop = this.worldPosition.subtractFrom((this.origin));
            return new Rectangle(leftTop.x, leftTop.y, this.width, this.height);
        }
    });

SpriteGameObject.prototype.draw = function () {
    if (this._visible)
        this.sprite.draw(this.worldPosition, this.origin, this._sheetIndex);
};
