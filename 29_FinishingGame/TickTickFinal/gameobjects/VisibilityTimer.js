"use strict";

function VisibilityTimer(target, layer, id) {
    powerupjs.GameObject.call(this, layer, id);
    this._target = target;
    this._timeLeft = 0;
    this._totalTime = 5;
}

VisibilityTimer.prototype = Object.create(powerupjs.GameObject.prototype);

VisibilityTimer.prototype.update = function (delta) {
    this._timeLeft -= delta;
    if (this._timeLeft <= 0)
        this._target.visible = false;
};

VisibilityTimer.prototype.startVisible = function () {
    this._timeLeft = this._totalTime;
    this._target.visible = true;
};