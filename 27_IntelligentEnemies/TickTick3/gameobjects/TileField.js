"use strict";

function TileField(rows, columns, layer, id) {
    powerupjs.GameObjectGrid.call(this, rows, columns, layer, id);
}

TileField.prototype = Object.create(powerupjs.GameObjectGrid.prototype);

TileField.prototype.getTileType = function (x, y) {
    if (x < 0 || x >= this.columns)
        return TileType.normal;
    if (y < 0 || y >= this.rows)
        return TileType.background;
    return this.at(x, y).type;
};