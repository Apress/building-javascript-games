"use strict";

function JewelGrid(rows, columns, layer) {
    GameObjectGrid.call(this, rows, columns, layer);
    this.dragging = false;
    this._dragRow = 0;
    this._draggingLastX = 0;
    this._touchIndex = 0;
}

JewelGrid.prototype = Object.create(GameObjectGrid.prototype);

JewelGrid.prototype.handleInput = function (delta) {
    if (Touch.isTouchDevice)
        this.handleInputTouch(delta);
    else
        this.handleInputMouse(delta);
};

JewelGrid.prototype.handleInputMouse = function (delta) {
    if (Mouse.left.down && !this.dragging) {
        var rect = new Rectangle(this.worldPosition.x, this.worldPosition.y, this.columns * this.cellHeight, this.rows * this.cellWidth);
        if (Mouse.containsMouseDown(rect)) {
            this.dragging = true;
            this._dragRow = Math.floor((Mouse.position.y - this.worldPosition.y) / this.cellHeight);
            this._draggingLastX = Mouse.position.x - this.worldPosition.x;
        }
    }
    if (!Mouse.left.down) {
        this.dragging = false;
    }

    if (this.dragging) {
        var newpos = Mouse.position.x - this.worldPosition.x;

        // reposition each jewel in the row
        for (var i = 0; i < this.columns; i++) {
            var currObj = this.at(i, this._dragRow);
            currObj.position.x += (newpos - this._draggingLastX);
        }
        // check if we need to shift a row
        var firstObj = this.at(0, this._dragRow);
        if (firstObj.position.x < -this.cellWidth / 2 && newpos - this._draggingLastX < 0)
            this.shiftRowLeft(this._dragRow);
        var lastObj = this.at(this.columns - 1, this._dragRow);
        if (lastObj.position.x > (this.columns - 1) * this.cellWidth + this.cellWidth / 2 && newpos - this._draggingLastX > 0)
            this.shiftRowRight(this._dragRow);
        this._draggingLastX = newpos;
    }
};

JewelGrid.prototype.handleInputTouch = function (delta) {
    var pos, newpos;
    var rect = new Rectangle(this.worldPosition.x, this.worldPosition.y, this.columns * this.cellHeight, this.rows * this.cellWidth);

    if (Touch.isTouching && !this.dragging) {
        if (Touch.containsTouch(rect)) {
            this._touchIndex = Touch.getIndexInRect(rect);
            pos = Touch.getPosition(this._touchIndex);
            this.dragging = true;
            this._dragRow = Math.floor((pos.y - this.worldPosition.y) / this.cellHeight);
            this._draggingLastX = pos.x - this.worldPosition.x;
        }
    }
    if (!Touch.isTouching) {
        this.dragging = false;
    }

    if (this.dragging) {
        pos = Touch.getPosition(this._touchIndex);
        newpos = pos.x - this.worldPosition.x;

        // reposition each jewel in the row
        for (var i = 0; i < this.columns; i++) {
            var currObj = this.at(i, this._dragRow);
            currObj.position.x += (newpos - this._draggingLastX);
        }
        // check if we need to shift a row
        var firstObj = this.at(0, this._dragRow);
        if (firstObj.position.x < -this.cellWidth / 2 && newpos - this._draggingLastX < 0)
            this.shiftRowLeft(this._dragRow);
        var lastObj = this.at(this.columns - 1, this._dragRow);
        if (lastObj.position.x > (this.columns - 1) * this.cellWidth + this.cellWidth / 2 && newpos - this._draggingLastX > 0)
            this.shiftRowRight(this._dragRow);
        this._draggingLastX = newpos;
    }
};

JewelGrid.prototype.shiftRowRight = function (selectedRow) {
    var lastObj = this.at(this._columns - 1, selectedRow);
    var positionOffset = lastObj.position.x - (this.columns - 1) * this.cellWidth;
    for (var x = this._columns - 1; x > 0; x -= 1)
        this._gameObjects[selectedRow * this._columns + x] = this._gameObjects[selectedRow * this._columns + (x - 1)];
    this._gameObjects[selectedRow * this._columns] = lastObj;
    lastObj.position = new Vector2(-this.cellWidth + positionOffset, selectedRow * this.cellHeight);
};

JewelGrid.prototype.shiftRowLeft = function (selectedRow) {
    var firstObj = this.at(0, selectedRow);
    var positionOffset = firstObj.position.x;
    for (var x = 0; x < this._columns - 1; x += 1)
        this._gameObjects[selectedRow * this._columns + x] = this._gameObjects[selectedRow * this._columns + x + 1];
    this._gameObjects[selectedRow * this._columns + (this._columns - 1)] = firstObj;
    firstObj.position = new Vector2(this._columns * this.cellWidth + positionOffset, selectedRow * this.cellHeight);
};