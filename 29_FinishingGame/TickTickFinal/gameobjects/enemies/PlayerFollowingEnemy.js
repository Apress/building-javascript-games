"use strict";

function PlayerFollowingEnemy(layer, id) {
    PatrollingEnemy.call(this, layer, id);
}

PlayerFollowingEnemy.prototype = Object.create(PatrollingEnemy.prototype);

PlayerFollowingEnemy.prototype.update = function (delta) {
    PatrollingEnemy.prototype.update.call(this, delta);

    var player = this.root.find(ID.player);
    var direction = player.position.x - this.position.x;
    if (Math.sign(direction) !== Math.sign(this.velocity.x) && player.velocity.x !== 0
        && this.velocity.x !== 0)
        this.turnAround();
};