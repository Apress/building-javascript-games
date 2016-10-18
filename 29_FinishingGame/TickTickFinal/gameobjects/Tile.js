"use strict";

var TileType = {
    background: 0,
    normal: 1,
    platform: 2
};

function Tile(sprite, tileTp, layer, id) {
    sprite = typeof sprite !== 'undefined' ? sprite : sprites.wall;
    powerupjs.SpriteGameObject.call(this, sprite, layer, id);

    this.hot = false;
    this.ice = false;
    this.type = typeof tileTp !== 'undefined' ? tileTp : TileType.background;
}

Tile.prototype = Object.create(powerupjs.SpriteGameObject.prototype);

Tile.prototype.draw = function () {
    if (this.type == TileType.background)
        return;
    powerupjs.SpriteGameObject.prototype.draw.call(this);
};
