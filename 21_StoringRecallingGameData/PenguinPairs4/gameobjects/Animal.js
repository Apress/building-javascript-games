"use strict";

function Animal(color, sprite, layer) {
    SpriteGameObject.call(this, sprite, layer);

    this.initialPosition = Vector2.zero;
    this.boxed = (color === color.toUpperCase());
    this.initialEmptyBox = this.boxed && color.toLowerCase() === "x";
    this.sheetIndex = "brgyopmx".indexOf(color.toLowerCase());
}

Animal.prototype = Object.create(SpriteGameObject.prototype);

Animal.prototype.reset = function () {
    this.position = this.initialPosition.copy();
    this.velocity = Vector2.zero;
    this.visible = true;
    if (this.initialEmptyBox)
        this.sheetIndex = 7;
};

Animal.prototype.isSeal = function () {
    return this.sheetIndex === 7 && !this.boxed;
};

Animal.prototype.isMulticolor = function () {
    return this.sheetIndex === 6 && !this.boxed;
};

Animal.prototype.isEmptyBox = function () {
    return this.sheetIndex === 7 && this.boxed;
};