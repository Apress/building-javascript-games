"use strict";

function PairList(nrPairs, layer, id) {
    SpriteGameObject.call(this, sprites.frame_goal, layer, id);
    this._pairs = [];
    for (var i = 0; i < nrPairs; i++)
        this._pairs.push(7);
    this._pairSprite = new SpriteGameObject(sprites.penguin_pairs);
    this._pairSprite.parent = this;
}
PairList.prototype = Object.create(SpriteGameObject.prototype);

Object.defineProperty(PairList.prototype, "completed",
    {
        get: function () {
            for (var i = 0, l = this._pairs.length; i < l; i++)
                if (this._pairs[i] === 7)
                    return false;
            return true;
        }
    });

PairList.prototype.addPair = function (index) {
    var i = 0;
    while (i < this._pairs.length && this._pairs[i] !== 7)
        i++;
    if (i < this._pairs.length)
        this._pairs[i] = index;
};

PairList.prototype.reset = function () {
    for (var i = 0, l = this._pairs.length; i < l; i++)
        this._pairs[i] = 7;
};

PairList.prototype.draw = function () {
    SpriteGameObject.prototype.draw.call(this);
    if (!this.visible)
        return;
    for (var i = 0, l = this._pairs.length; i < l; i++) {
        this._pairSprite.position = new Vector2(110 + i * this.height, 8);
        this._pairSprite.sheetIndex = this._pairs[i];
        this._pairSprite.draw();
    }
};