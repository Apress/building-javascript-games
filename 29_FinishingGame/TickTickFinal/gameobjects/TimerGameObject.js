"use strict";

function TimerGameObject(layer, id) {
    powerupjs.Label.call(this, "Arial", "26pt", layer, id);
    this.reset()
}
TimerGameObject.prototype = Object.create(powerupjs.Label.prototype);

Object.defineProperty(TimerGameObject.prototype, "gameOver",
    {
        get: function () {
            return this._timeLeft <= 0;
        }
    });

TimerGameObject.prototype.update = function (delta) {
    if (!this.running)
        return;
    this._timeLeft -= delta * this.multiplier;
    if (this._timeLeft < 0)
        this.running = false;

    var minutes = Math.floor(this._timeLeft / 60);
    var seconds = Math.ceil(this._timeLeft % 60);
    if (this._timeLeft < 0)
        minutes = seconds = 0;
    this.text = minutes + ":" + seconds;
    if (seconds < 10)
        this.text = minutes + ":0" + seconds;
    this.color = powerupjs.Color.yellow;
    if (this._timeLeft <= 10 && seconds % 2 === 0)
        this.color = powerupjs.Color.red;
};

TimerGameObject.prototype.reset = function () {
    powerupjs.Label.prototype.reset.call(this);
    this._timeLeft = 30;
    this.running = true;
    this.multiplier = 1;
};