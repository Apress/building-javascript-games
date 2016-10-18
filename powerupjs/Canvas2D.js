"use strict";

var powerupjs = (function (powerupjs) {

    function Canvas2D_Singleton() {
        this._canvas = null;
        this._canvasContext = null;
        this._pixeldrawingCanvas = null;
        this._canvasOffset = powerupjs.Vector2.zero;
    }

    Object.defineProperty(Canvas2D_Singleton.prototype, "offset",
        {
            get: function () {
                return this._canvasOffset;
            }
        });

    Object.defineProperty(Canvas2D_Singleton.prototype, "scale",
        {
            get: function () {
                return new powerupjs.Vector2(this._canvas.width / powerupjs.Game.size.x,
                    this._canvas.height / powerupjs.Game.size.y);
            }
        });

    Canvas2D_Singleton.prototype.initialize = function (divName, canvasName) {
        this._canvas = document.getElementById(canvasName);
        this._div = document.getElementById(divName);

        if (this._canvas.getContext)
            this._canvasContext = this._canvas.getContext('2d');
        else {
            alert('Your browser is not HTML5 compatible.!');
            return;
        }

        this._pixeldrawingCanvas = document.createElement('canvas');

        window.onresize = this.resize;
        this.resize();
    };

    Canvas2D_Singleton.prototype.clear = function () {
        this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };

    Canvas2D_Singleton.prototype.resize = function () {
        var gameCanvas = powerupjs.Canvas2D._canvas;
        var gameArea = powerupjs.Canvas2D._div;
        var widthToHeight = powerupjs.Game.size.x / powerupjs.Game.size.y;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';

        gameArea.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
        gameArea.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
        gameArea.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
        gameArea.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';

        gameCanvas.width = newWidth;
        gameCanvas.height = newHeight;

        var offset = powerupjs.Vector2.zero;
        if (gameCanvas.offsetParent) {
            do {
                offset.x += gameCanvas.offsetLeft;
                offset.y += gameCanvas.offsetTop;
            } while ((gameCanvas = gameCanvas.offsetParent));
        }
        powerupjs.Canvas2D._canvasOffset = offset;
    };

    Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, scale, origin, sourceRect, mirror) {
        var canvasScale = this.scale;

        position = typeof position !== 'undefined' ? position : powerupjs.Vector2.zero;
        rotation = typeof rotation !== 'undefined' ? rotation : 0;
        scale = typeof scale !== 'undefined' ? scale : 1;
        origin = typeof origin !== 'undefined' ? origin : powerupjs.Vector2.zero;
        sourceRect = typeof sourceRect !== 'undefined' ? sourceRect : new powerupjs.Rectangle(0, 0, sprite.width, sprite.height);

        this._canvasContext.save();
        if (mirror) {
            this._canvasContext.scale(scale * canvasScale.x * -1, scale * canvasScale.y);
            this._canvasContext.translate(-position.x - sourceRect.width, position.y);
            this._canvasContext.rotate(rotation);
            this._canvasContext.drawImage(sprite, sourceRect.x, sourceRect.y,
                sourceRect.width, sourceRect.height,
                sourceRect.width - origin.x, -origin.y,
                sourceRect.width, sourceRect.height);
        }
        else {
            this._canvasContext.scale(scale * canvasScale.x, scale * canvasScale.y);
            this._canvasContext.translate(position.x, position.y);
            this._canvasContext.rotate(rotation);
            this._canvasContext.drawImage(sprite, sourceRect.x, sourceRect.y,
                sourceRect.width, sourceRect.height,
                -origin.x, -origin.y,
                sourceRect.width, sourceRect.height);
        }
        this._canvasContext.restore();
    };

    Canvas2D_Singleton.prototype.drawText = function (text, position, origin, color, textAlign, fontname, fontsize) {
        var canvasScale = this.scale;

        position = typeof position !== 'undefined' ? position : powerupjs.Vector2.zero;
        origin = typeof origin !== 'undefined' ? origin : powerupjs.Vector2.zero;
        color = typeof color !== 'undefined' ? color : powerupjs.Color.black;
        textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
        fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
        fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

        this._canvasContext.save();
        this._canvasContext.scale(canvasScale.x, canvasScale.y);
        this._canvasContext.translate(position.x - origin.x, position.y - origin.y);
        this._canvasContext.textBaseline = 'top';
        this._canvasContext.font = fontsize + " " + fontname;
        this._canvasContext.fillStyle = color.toString();
        this._canvasContext.textAlign = textAlign;
        this._canvasContext.fillText(text, 0, 0);
        this._canvasContext.restore();
    };

    Canvas2D_Singleton.prototype.drawPixel = function (x, y, color) {
        var canvasscale = this.scale;
        this._canvasContext.save();
        this._canvasContext.scale(canvasscale.x, canvasscale.y);
        this._canvasContext.fillStyle = color.toString();
        this._canvasContext.fillRect(x, y, 1, 1);
        this._canvasContext.restore();
    };

    Canvas2D_Singleton.prototype.drawRectangle = function (x, y, width, height) {
        var canvasScale = this.scale;
        this._canvasContext.save();
        this._canvasContext.scale(canvasScale.x, canvasScale.y);
        this._canvasContext.strokeRect(x, y, width, height);
        this._canvasContext.restore();
    };

    powerupjs.Canvas2D = new Canvas2D_Singleton();

    return powerupjs;

})(powerupjs || {});
