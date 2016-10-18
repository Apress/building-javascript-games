"use strict";

function GlitterField(density, width, height, layer, id) {
    GameObject.call(this, layer, id);
    this.positions = [];
    this.scales = [];
    this._scaleMax = 1;
    this._scaleStep = 0.05;
    this.width = width;
    this.height = height;

    // fill it with random positions
    for (var i = 0; i < density; i++) {
        this.positions.push(this.createRandomPosition());
        this.scales.push(0);
    }
}

GlitterField.prototype = Object.create(GameObject.prototype);

GlitterField.prototype.createRandomPosition = function () {
    return new Vector2(Math.random() * this.width, Math.random() * this.height);
};

GlitterField.prototype.update = function (delta) {
    for (var i = 0; i < this.scales.length; i += 1) {
        if (this.scales[i] === 0 && Math.random() < 0.01)
            this.scales[i] += this._scaleStep;
        else if (this.scales[i] !== 0) {
            this.scales[i] += this._scaleStep;
            if (this.scales[i] >= this._scaleMax * 2) {
                this.scales[i] = 0;
                this.positions[i] = this.createRandomPosition();
            }
        }
    }
};

GlitterField.prototype.draw = function () {
    if (!this.visible)
        return;
    var origin = new Vector2(sprites.glitter.width / 2, sprites.glitter.height / 2);
    for (var i = 0; i < this.scales.length; i++) {
        var scale = this.scales[i];
        if (this.scales[i] > this._scaleMax)
            scale = this._scaleMax * 2 - this.scales[i];
        var pos = this.worldPosition.addTo(this.positions[i]);
        Canvas2D.drawImage(sprites.glitter, pos, 0, scale, origin);
    }
};