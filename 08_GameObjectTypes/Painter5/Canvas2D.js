"use strict";

function Canvas2D_Singleton() {
    this.canvas = undefined;
    this.canvasContext = undefined;
}

Canvas2D_Singleton.prototype.initialize = function (canvasName) {
    this.canvas = document.getElementById(canvasName);
    this.canvasContext = this.canvas.getContext('2d');
};

Canvas2D_Singleton.prototype.clear = function () {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, origin) {
    this.canvasContext.save();
    this.canvasContext.translate(position.x, position.y);
    this.canvasContext.rotate(rotation);
    this.canvasContext.drawImage(sprite, 0, 0,
        sprite.width, sprite.height,
        -origin.x, -origin.y,
        sprite.width, sprite.height);
    this.canvasContext.restore();
};

var Canvas2D = new Canvas2D_Singleton();