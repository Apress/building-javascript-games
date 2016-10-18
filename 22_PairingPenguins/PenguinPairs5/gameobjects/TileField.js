"use strict";

function TileField(rows, columns, layer, id) {
    GameObjectGrid.call(this, rows, columns, layer, id);
}

TileField.prototype = Object.create(GameObjectGrid.prototype);

TileField.prototype.getTileType = function (pos) {
    if (this.isOutsideField(pos))
        return TileType.background;
    return this.at(pos.x, pos.y).type;
};

TileField.prototype.isOutsideField = function (pos) {
    return (pos.x < 0 || pos.x >= this.columns || pos.y < 0 || pos.y >= this.rows);
};