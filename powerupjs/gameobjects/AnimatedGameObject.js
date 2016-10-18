"use strict";
var powerupjs = (function (powerupjs) {

    function AnimatedGameObject(layer, id) {
        powerupjs.SpriteGameObject.call(this, null, layer, id);

        this._animations = {};
        this._current = null;
        this._time = 0;
    }

    AnimatedGameObject.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

    AnimatedGameObject.prototype.loadAnimation = function (animname, id, looping, frametime) {
        this._animations[id] = new powerupjs.Animation(animname, looping, frametime);
    };

    AnimatedGameObject.prototype.playAnimation = function (id) {
        if (this._current === this._animations[id])
            return;
        this._sheetIndex = 0;
        this._time = 0;
        this._current = this._animations[id];
        this.sprite = this._current.sprite;
    };

    AnimatedGameObject.prototype.animationEnded = function () {
        return !this._current.looping && this.sheetIndex >= this.sprite.nrSheetElements - 1;
    };

    AnimatedGameObject.prototype.update = function (delta) {
        this._time += delta;
        while (this._time > this._current.frameTime) {
            this._time -= this._current.frameTime;
            this._sheetIndex++;
            if (this._sheetIndex > this.sprite.nrSheetElements - 1)
                if (this._current.looping)
                    this._sheetIndex = 0;
                else
                    this._sheetIndex = this.sprite.nrSheetElements - 1;
        }
        powerupjs.SpriteGameObject.prototype.update.call(this, delta);
    };

    powerupjs.AnimatedGameObject = AnimatedGameObject;
    return powerupjs;

})(powerupjs || {});   
