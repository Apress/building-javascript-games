"use strict";

function Arrow(sheetIndex, layer, id) {
    powerupjs.Button.call(this, sprites.arrow, layer, id);
    this.sheetIndex = sheetIndex;
    this.arrowHover = new powerupjs.SpriteGameObject(sprites.arrow_hover);
    this.arrowHover.sheetIndex = sheetIndex;
    this.arrowHover.visible = false;
    this.arrowHover.parent = this;
}

Arrow.prototype = Object.create(powerupjs.Button.prototype);

Arrow.prototype.handleInput = function (delta) {
    powerupjs.Button.prototype.handleInput.call(this, delta);
    this.arrowHover.visible = !powerupjs.Touch.isTouchDevice && this.boundingBox.contains(powerupjs.Mouse.position);
};

Arrow.prototype.draw = function () {
    powerupjs.Button.prototype.draw.call(this);
    this.arrowHover.draw();
};