"use strict";

function JewelJamGameWorld() {

    this.rows = 10;
    this.columns = 5;
    this.grid = new Array(this.rows * this.columns);
    for (var i = 0; i < this.rows * this.columns; i++) {
        var randomval = Math.floor(Math.random() * 3) + 1;
        this.grid[i] = sprites["single_jewel" + randomval];
    }
}

JewelJamGameWorld.prototype.setGridValue = function (x, y, value) {
    var index = y * this.columns + x;
    this.grid[index] = value;
};

JewelJamGameWorld.prototype.getGridValue = function (x, y) {
    var index = y * this.columns + x;
    return this.grid[index];
};

JewelJamGameWorld.prototype.moveRowDown = function () {
    for (var y = this.rows - 2; y >= 0; y--) {
        for (var x = 0; x < this.columns; x++) {
            this.setGridValue(x, y + 1, this.getGridValue(x, y));
        }
    }
    for (x = 0; x < this.columns; x++) {
        var randomval = Math.floor(Math.random() * 3) + 1;
        this.setGridValue(x, 0, sprites["single_jewel" + randomval]);
    }
};

JewelJamGameWorld.prototype.handleInput = function (delta) {
    if (Keyboard.pressed(Keys.space))
        this.moveRowDown();
};

JewelJamGameWorld.prototype.update = function (delta) {
};

JewelJamGameWorld.prototype.draw = function (delta) {
    Canvas2D.drawImage(sprites.background);
    for (var row = 0; row < this.rows; row++) {
        for (var col = 0; col < this.columns; col++) {
            var position = new Vector2(85 + col * 85, 150 + row * 85);
            Canvas2D.drawImage(this.getGridValue(col, row), position);
        }
    }
};