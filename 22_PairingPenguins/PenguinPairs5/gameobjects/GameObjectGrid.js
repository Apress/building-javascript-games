"use strict";

function GameObjectGrid(rows, columns, layer, id) {
    GameObjectList.call(this, layer, id);

    this.cellWidth = 0;
    this.cellHeight = 0;
    this._rows = rows;
    this._columns = columns;
}

GameObjectGrid.prototype = Object.create(GameObjectList.prototype);

Object.defineProperty(GameObjectGrid.prototype, "rows", {
    get: function () {
        return this._rows;
    }
});

Object.defineProperty(GameObjectGrid.prototype, "columns", {
    get: function () {
        return this._columns;
    }
});

GameObjectGrid.prototype.add = function (gameobject) {
    var row = Math.floor(this._gameObjects.length / this._columns);
    var col = this._gameObjects.length % this._columns;
    this._gameObjects.push(gameobject);
    gameobject.parent = this;
    gameobject.position = new Vector2(col * this.cellWidth, row * this.cellHeight);
};

GameObjectGrid.prototype.addAt = function (gameobject, col, row) {
    this._gameObjects[row * this._columns + col] = gameobject;
    gameobject.parent = this;
    gameobject.position = new Vector2(col * this.cellWidth, row * this.cellHeight);
};

GameObjectGrid.prototype.at = function (col, row) {
    var index = row * this._columns + col;
    if (index < 0 || index >= this._gameObjects.length)
        return null;
    else
        return this._gameObjects[index];
};

GameObjectGrid.prototype.getAnchorPosition = function (gameobject) {
    var l = this._gameObjects.length;
    for (var i = 0; i < l; ++i)
        if (this._gameObjects[i] == gameobject) {
            var row = Math.floor(i / this.columns);
            var col = i - row * this.columns;
            return new Vector2(col * this.cellWidth, row * this.cellHeight);
        }
    return Vector2.zero;
};