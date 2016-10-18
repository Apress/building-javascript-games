"use strict";

function OnOffButton(sprite, layer) {
    powerupjs.SpriteGameObject.call(this, sprite, layer);
}

OnOffButton.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Object.defineProperty(OnOffButton.prototype, "on",
    {
        get: function () {
            return this.sheetIndex === 1;
        },
        set: function (value) {
            if (value)
                this.sheetIndex = 1;
            else
                this.sheetIndex = 0;
        }
    });

OnOffButton.prototype.handleInput = function (delta) {
    if (!this.visible)
        return;
    if (powerupjs.Touch.containsTouchPress(this.boundingBox) ||
        powerupjs.Mouse.containsMousePress(this.boundingBox))
        this.sheetIndex = (this.sheetIndex + 1) % 2;
};