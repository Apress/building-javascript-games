"use strict";

GameObjectList.prototype = Object.create(GameObject.prototype);

function GameObjectList(layer, id) {
    GameObject.call(this, layer, id);

    this._gameObjects = [];
}

Object.defineProperty(GameObjectList.prototype, "length", {
    get: function () {
        return this._gameObjects.length;
    }
});

GameObjectList.prototype.add = function (gameobject) {
    this._gameObjects.push(gameobject);
    gameobject.parent = this;
    this._gameObjects.sort(function (a, b) {
        return a.layer - b.layer;
    });
};

GameObjectList.prototype.remove = function (gameobject) {
    for (var i = 0, l = this._gameObjects.length; i < l; ++i) {
        if (gameobject !== this._gameObjects[i])
            continue;
        this._gameObjects.splice(i, 1);
        gameobject.parent = null;
        return;
    }
};

GameObjectList.prototype.at = function (index) {
    if (index < 0 || index >= this._gameObjects.length)
        return null;
    return this._gameObjects[index];
};

GameObjectList.prototype.clear = function () {
    for (var i = 0, l = this._gameObjects.length; i < l; ++i)
        this._gameObjects[i].parent = null;
    this._gameObjects = [];
};

GameObjectList.prototype.find = function (id) {
    for (var i = 0, l = this._gameObjects.length; i < l; ++i) {
        if (this._gameObjects[i].id === id)
            return this._gameObjects[i];
        if (this._gameObjects[i] instanceof GameObjectList) {
            var obj = this._gameObjects[i].find(id);
            if (obj !== null)
                return obj;
        }
    }
    return null;
};

GameObjectList.prototype.handleInput = function (delta) {
    for (var i = this._gameObjects.length - 1; i >= 0; --i)
        this._gameObjects[i].handleInput(delta);
};

GameObjectList.prototype.update = function (delta) {
    for (var i = 0, l = this._gameObjects.length; i < l; ++i)
        this._gameObjects[i].update(delta);
};

GameObjectList.prototype.draw = function () {
    for (var i = 0, l = this._gameObjects.length; i < l; ++i)
        if (this._gameObjects[i].visible)
            this._gameObjects[i].draw();
};

GameObjectList.prototype.reset = function () {
    for (var i = 0, l = this._gameObjects.length; i < l; ++i)
        this._gameObjects[i].reset();
};