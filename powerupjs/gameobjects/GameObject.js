"use strict";

var powerupjs = (function (powerupjs) {

    function GameObject(layer, id) {
        powerupjs.IGameLoopObject.call(this);

        this.layer = typeof layer !== 'undefined' ? layer : 0;
        this.id = typeof id !== 'undefined' ? id : 0;
        this.parent = null;
        this.position = powerupjs.Vector2.zero;
        this.velocity = powerupjs.Vector2.zero;
        this._visible = true;
    }

    GameObject.prototype = Object.create(powerupjs.IGameLoopObject.prototype);

    Object.defineProperty(GameObject.prototype, "visible",
        {
            get: function () {
                if (this.parent === null)
                    return this._visible;
                else
                    return this._visible && this.parent.visible;
            },

            set: function (value) {
                this._visible = value;
            }
        });

    Object.defineProperty(GameObject.prototype, "root",
        {
            get: function () {
                if (this.parent === null)
                    return this;
                else
                    return this.parent.root;
            }
        });

    Object.defineProperty(GameObject.prototype, "worldPosition",
        {
            get: function () {
                if (this.parent !== null)
                    return this.parent.worldPosition.addTo(this.position);
                else
                    return this.position.copy();
            }
        });

    GameObject.prototype.reset = function () {
        this._visible = true;
    };

    GameObject.prototype.update = function (delta) {
        this.position.addTo(this.velocity.multiply(delta));
    };

    powerupjs.GameObject = GameObject;
    return powerupjs;

})(powerupjs || {});