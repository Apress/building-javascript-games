"use strict";

var TileType = {
    normal: 0,
    background: 1,
    wall: 2
};

function Tile(sprite, layer) {
    powerupjs.SpriteGameObject.call(this, sprite, layer);
    this.type = TileType.normal;
}

Tile.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Tile.prototype.draw = function () {
    if (this.type === TileType.background)
        return;
    powerupjs.SpriteGameObject.prototype.draw.call(this);
};