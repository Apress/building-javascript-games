"use strict";

var powerupjs = (function (powerupjs) {

    function SpriteGameObject(sprite, layer, id) {
        powerupjs.GameObject.call(this, layer, id);

        this.sprite = sprite;

        this.origin = powerupjs.Vector2.zero;
        this.mirror = false;
        this._sheetIndex = 0;
    }

    SpriteGameObject.prototype = Object.create(powerupjs.GameObject.prototype);

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
                if (value >= 0)
                    this._sheetIndex = value % this.sprite.nrSheetElements;
            }
        });

    Object.defineProperty(SpriteGameObject.prototype, "screenCenterX",
        {
            get: function () {
                return (powerupjs.Game.size.x - this.width) / 2 + this.origin.x;
            }
        });

    Object.defineProperty(SpriteGameObject.prototype, "screenCenterY",
        {
            get: function () {
                return (powerupjs.Game.size.y - this.height) / 2 + this.origin.y;
            }
        });

    Object.defineProperty(SpriteGameObject.prototype, "screenCenter",
        {
            get: function () {
                return powerupjs.Game.size.subtract(this.size).divideBy(2).addTo(this.origin);
            }
        });

    Object.defineProperty(SpriteGameObject.prototype, "boundingBox",
        {
            get: function () {
                var leftTop = this.worldPosition.subtractFrom((this.origin));
                return new powerupjs.Rectangle(leftTop.x, leftTop.y, this.width, this.height);
            }
        });

    SpriteGameObject.prototype.draw = function () {
        if (this._visible)
            this.sprite.draw(this.worldPosition, this.origin, this._sheetIndex, this.mirror);
    };

    SpriteGameObject.prototype.collidesWith = function (obj) {
        if (!this.visible || !obj.visible || !this.boundingBox.intersects(obj.boundingBox))
            return false;
        var intersect = this.boundingBox.intersection(obj.boundingBox);
        var local = intersect.position.subtractFrom(this.worldPosition.subtractFrom(this.origin));
        var objLocal = intersect.position.subtractFrom(obj.worldPosition.subtractFrom(obj.origin));
        for (var x = 0; x < intersect.width; x++)
            for (var y = 0; y < intersect.height; y++) {
                if (this.getAlpha(Math.floor(local.x + x), Math.floor(local.y + y)) !== 0
                    && obj.getAlpha(Math.floor(objLocal.x + x), Math.floor(objLocal.y + y)) !== 0)
                    return true;
            }
        return false;
    };

    SpriteGameObject.prototype.getAlpha = function (x, y) {
        return this.sprite.getAlpha(x, y, this._sheetIndex, this.mirror);
    };

    powerupjs.SpriteGameObject = SpriteGameObject;
    return powerupjs;

})(powerupjs || {});   
