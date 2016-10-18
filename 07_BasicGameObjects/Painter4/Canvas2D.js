"use strict";

var Canvas2D = {
    canvas : undefined,
    canvasContext : undefined
};

Canvas2D.initialize = function (canvasName) {
    Canvas2D.canvas = document.getElementById(canvasName);
    Canvas2D.canvasContext = Canvas2D.canvas.getContext('2d');
};

Canvas2D.clear = function () {
    Canvas2D.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Canvas2D.drawImage = function (sprite, position, rotation, origin) {
    Canvas2D.canvasContext.save();
    Canvas2D.canvasContext.translate(position.x, position.y);
    Canvas2D.canvasContext.rotate(rotation);
    Canvas2D.canvasContext.drawImage(sprite, 0, 0,
        sprite.width, sprite.height,
        -origin.x, -origin.y,
        sprite.width, sprite.height);
    Canvas2D.canvasContext.restore();
};