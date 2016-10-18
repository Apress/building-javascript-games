"use strict";

function UnpredictableEnemy(layer, id) {
    PatrollingEnemy.call(this, layer, id);
}

UnpredictableEnemy.prototype = Object.create(PatrollingEnemy.prototype);

UnpredictableEnemy.prototype.update = function (delta) {
    PatrollingEnemy.prototype.update.call(this, delta);
    if (this._waitTime <= 0 && Math.random() < 0.01) {
        this.turnAround();
        this.velocity.x = Math.sign(this.velocity.x) *
            Math.random() * 300;
    }
};