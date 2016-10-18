"use strict";

function SpriteSheet(imageName) {
    console.log("Loading sprite: " + imageName);
    Game._spritesStillLoading += 1;
    Game._totalSprites += 1;

    this._image = new Image();
    this._image.src = imageName;
    this._sheetColumns = 1;
    this._sheetRows = 1;
    this._collisionMask = null;

    var sprite = this;
    this._image.onload = function () {
        Game._spritesStillLoading -= 1;
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
            return new Vector2(this.width, this.height);
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

SpriteSheet.prototype.draw = function (position, origin, sheetIndex, mirror) {
    var columnIndex = sheetIndex % this._sheetColumns;
    var rowIndex = Math.floor(sheetIndex / this._sheetColumns) % this._sheetRows;
    var imagePart = new Rectangle(columnIndex * this.width, rowIndex * this.height,
        this.width, this.height);
    Canvas2D.drawImage(this._image, position, 0, 1, origin, imagePart, mirror);
};