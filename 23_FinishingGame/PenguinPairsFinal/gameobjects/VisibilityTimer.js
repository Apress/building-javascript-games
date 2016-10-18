"use strict";

function VisibilityTimer(target, layer) {
    powerupjs.GameObject.call(this, layer);
    this.target = target;
    this._timeLeft = 0;
    this._totalTime = 1;
}

VisibilityTimer.prototype = Object.create(powerupjs.GameObject.prototype);

VisibilityTimer.prototype.update = function (delta) {
    this._timeLeft -= delta;
    if (this._timeLeft <= 0)
        this.target.visible = false;
};

VisibilityTimer.prototype.startVisible = function () {
    this._timeLeft = this._totalTime;
    this.target.visible = true;
};