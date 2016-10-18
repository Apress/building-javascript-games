"use strict";

function Arrow(sheetIndex, layer, id) {
    Button.call(this, sprites.arrow, layer, id);
    this.sheetIndex = sheetIndex;
    this.arrowHover = new SpriteGameObject(sprites.arrow_hover);
    this.arrowHover.sheetIndex = sheetIndex;
    this.arrowHover.visible = false;
    this.arrowHover.parent = this;
}

Arrow.prototype = Object.create(Button.prototype);

Arrow.prototype.handleInput = function (delta) {
    Button.prototype.handleInput.call(this, delta);
    this.arrowHover.visible = !Touch.isTouchDevice && this.boundingBox.contains(Mouse.position);
};

Arrow.prototype.draw = function () {
    Button.prototype.draw.call(this);
    this.arrowHover.draw();
};