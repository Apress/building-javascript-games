"use strict";

function Canvas2D_Singleton() {
    console.log("Creating Canvas2D object");
    this._canvas = null;
    this._canvasContext = null;
}

Canvas2D_Singleton.prototype.initialize = function (canvasName) {
    this._canvas = document.getElementById(canvasName);

    if (this._canvas.getContext)
        this._canvasContext = this._canvas.getContext('2d');
    else {
        alert('Your browser is not HTML5 compatible.!');
    }
};

Canvas2D_Singleton.prototype.clear = function () {
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
};

Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, origin) {
    position = typeof position !== 'undefined' ? position : Vector2.zero;
    rotation = typeof rotation !== 'undefined' ? rotation : 0;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;

    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(sprite, 0, 0,
        sprite.width, sprite.height,
        -origin.x, -origin.y,
        sprite.width, sprite.height);
    this._canvasContext.restore();
};

var Canvas2D = new Canvas2D_Singleton();