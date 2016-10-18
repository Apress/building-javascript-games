"use strict";

var TileType = {
    normal: 0,
    background: 1,
    wall: 2
};

function Tile(sprite, layer) {
    SpriteGameObject.call(this, sprite, layer);
    this.type = TileType.normal;
}

Tile.prototype = Object.create(SpriteGameObject.prototype);

Tile.prototype.draw = function () {
    if (this.type === TileType.background)
        return;
    SpriteGameObject.prototype.draw.call(this);
};