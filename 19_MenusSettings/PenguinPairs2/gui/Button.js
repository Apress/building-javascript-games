"use strict";

function Button(sprite, layer, id) {
    SpriteGameObject.call(this, sprite, layer, id);

    this.pressed = false;
    this.down = false;
}

Button.prototype = Object.create(SpriteGameObject.prototype);

Button.prototype.handleInput = function (delta) {
    var boundingBox = this.boundingBox;
    this.pressed = this.visible && (Touch.containsTouchPress(boundingBox) ||
        Mouse.containsMousePress(boundingBox));
    this.down = this.visible && (Touch.containsTouch(boundingBox) ||
        Mouse.containsMouseDown(boundingBox));
};
