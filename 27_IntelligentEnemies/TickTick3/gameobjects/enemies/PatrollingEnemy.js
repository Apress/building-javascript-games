"use strict";

function PatrollingEnemy(layer, id) {
    powerupjs.AnimatedGameObject.call(this, layer, id);

    this._waitTime = 0;
    this.velocity.x = 120;

    this.loadAnimation(sprites.flame, "default", true);
    this.playAnimation("default");
    this.origin = new powerupjs.Vector2(this.width / 2, this.height);
}
PatrollingEnemy.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

PatrollingEnemy.prototype.update = function (delta) {
    powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
    if (this._waitTime > 0) {
        this._waitTime -= delta;
        if (this._waitTime <= 0)
            this.turnAround();
    }
    else {
        var tiles = this.root.find(ID.tiles);
        var posX = this.boundingBox.left;
        if (!this.mirror)
            posX = this.boundingBox.right;
        var tileX = Math.floor(posX / tiles.cellWidth);
        var tileY = Math.floor(this.position.y / tiles.cellHeight);
        if (tiles.getTileType(tileX, tileY - 1) === TileType.normal ||
            tiles.getTileType(tileX, tileY) === TileType.background) {
            this._waitTime = 0.5;
            this.velocity.x = 0;
        }
    }
};

PatrollingEnemy.prototype.turnAround = function () {
    this.mirror = !this.mirror;
    this.velocity.x = 120;
    if (this.mirror)
        this.velocity.x = -this.velocity.x;
};