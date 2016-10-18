"use strict";

function VisibilityTimer(target, layer, id) {
    GameObject.call(this, layer, id);
    this._target = target;
    this._timeLeft = 0;
    this.totalTime = 1;
}

VisibilityTimer.prototype = Object.create(GameObject.prototype);

VisibilityTimer.prototype.update = function (delta) {
    if (this._timeLeft > 0) {
        this._timeLeft -= delta;
        this._target.visible = true;
    } else
        this._target.visible = false;
};

VisibilityTimer.prototype.startVisible = function () {
    this._timeLeft = this.totalTime;
    this._target.visible = true;
};