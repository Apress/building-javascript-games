"use strict";

var powerupjs = (function (powerupjs) {

    function SpriteSheet(imageName, createCollisionMask) {
        console.log("Loading sprite: " + imageName);
        powerupjs.Game._spritesStillLoading += 1;
        powerupjs.Game._totalSprites += 1;

        this._image = new Image();
        this._image.src = imageName;
        this._sheetColumns = 1;
        this._sheetRows = 1;
        this._collisionMask = null;

        var sprite = this;
        this._image.onload = function () {
            if (createCollisionMask) {
                console.log("Creating collision mask for sprite: " + imageName);
                sprite.createPixelCollisionMask();
            }
            powerupjs.Game._spritesStillLoading -= 1;
        };

        // determine the number of sheet rows and columns
        var pathSplit = imageName.split('/');
        var fileName = pathSplit[pathSplit.length - 1];
        var fileSplit = fileName.split("/")[0].split(".")[0].split("@");
        if (fileSplit.length <= 1)
            return;
        var colRow = fileSplit[fileSplit.length - 1].split("x");
        this._sheetColumns = colRow[0];
        if (colRow.length === 2)
            this._sheetRows = colRow[1];
    }

    Object.defineProperty(SpriteSheet.prototype, "image",
        {
            get: function () {
                return this._image;
            }
        });

    Object.defineProperty(SpriteSheet.prototype, "width",
        {
            get: function () {
                return this._image.width / this._sheetColumns;
            }
        });

    Object.defineProperty(SpriteSheet.prototype, "height",
        {
            get: function () {
                return this._image.height / this._sheetRows;
            }
        });

    Object.defineProperty(SpriteSheet.prototype, "size",
        {
            get: function () {
                return new powerupjs.Vector2(this.width, this.height);
            }
        });

    Object.defineProperty(SpriteSheet.prototype, "center",
        {
            get: function () {
                return this.size.divideBy(2);
            }
        });

    Object.defineProperty(SpriteSheet.prototype, "nrSheetElements",
        {
            get: function () {
                return this._sheetRows * this._sheetColumns;
            }
        });

    SpriteSheet.prototype.createPixelCollisionMask = function () {
        this._collisionMask = [];
        var w = this._image.width;
        var h = this._image.height;
        powerupjs.Canvas2D._pixeldrawingCanvas.width = w;
        powerupjs.Canvas2D._pixeldrawingCanvas.height = h;
        var ctx = powerupjs.Canvas2D._pixeldrawingCanvas.getContext('2d');

        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.drawImage(this._image, 0, 0, w, h, 0, 0, w, h);
        ctx.restore();
        var imageData = ctx.getImageData(0, 0, w, h);
        for (var x = 3, l = w * h * 4; x < l; x += 4) {
            this._collisionMask.push(imageData.data[x]);
        }
    };

    SpriteSheet.prototype.getAlpha = function (x, y, sheetIndex, mirror) {
        if (this._collisionMask === null)
            return 255;

        var columnIndex = sheetIndex % this._sheetColumns;
        var rowIndex = Math.floor(sheetIndex / this._sheetColumns) % this._sheetRows;
        var textureX = columnIndex * this.width + x;
        if (mirror)
            textureX = (columnIndex + 1) * this.width - x - 1;
        var textureY = rowIndex * this.height + y;
        var arrayIndex = Math.floor(textureY * this._image.width + textureX);
        if (arrayIndex < 0 || arrayIndex >= this._collisionMask.length)
            return 0;
        else
            return this._collisionMask[arrayIndex];
    };

    SpriteSheet.prototype.draw = function (position, origin, sheetIndex, mirror) {
        var columnIndex = sheetIndex % this._sheetColumns;
        var rowIndex = Math.floor(sheetIndex / this._sheetColumns) % this._sheetRows;
        var imagePart = new powerupjs.Rectangle(columnIndex * this.width, rowIndex * this.height,
            this.width, this.height);
        powerupjs.Canvas2D.drawImage(this._image, position, 0, 1, origin, imagePart, mirror);
    };

    powerupjs.SpriteSheet = SpriteSheet;
    return powerupjs;

})(powerupjs || {});
