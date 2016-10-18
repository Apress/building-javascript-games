"use strict";

function JewelGrid(rows, columns, layer, id) {
    GameObjectGrid.call(this, rows, columns, layer, id);
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

JewelGrid.prototype.update = function (delta) {
    GameObjectList.prototype.update.call(this, delta);
    if (this.dragging)
        return;

    var middleCol = Math.floor(this._columns / 2);
    var nrCombis = 0;
    var i = 0;
    var score = this.root.find(ID.score);
    while (i < this._rows - 2) {
        if (this.isValidCombination(this.at(middleCol, i),
            this.at(middleCol, i + 1),
            this.at(middleCol, i + 2))) {
            this.removeJewel(middleCol, i, -this.cellHeight);
            this.removeJewel(middleCol, i + 1, -this.cellHeight * 2);
            this.removeJewel(middleCol, i + 2, -this.cellHeight * 3);
            score.score += 10;

            var jewelCart = this.root.find(ID.jewel_cart);
            jewelCart.pushCart();

            nrCombis++;
            i = 0;
        }
        else
            i++;
    }
    if (nrCombis === 1) {
        sounds.combi.play();
    }
    else if (nrCombis === 2) {
        score.score += 50;
        var doubleTimer = this.root.find(ID.double_timer);
        doubleTimer.startVisible();
        sounds.double.play();
    }
    else if (nrCombis >= 3) {
        score.score += 100;
        var tripleTimer = this.root.find(ID.triple_timer);
        tripleTimer.startVisible();
        sounds.triple.play();
    }
};

JewelGrid.prototype.isValidCombination = function (a, b, c) {
    var curra = a.variation;
    var currb = b.variation;
    var currc = c.variation;
    var divider = 9;

    for (var i = 0; i < 3; i += 1) {
        if ((Math.floor(curra / divider) + Math.floor(currb / divider) + Math.floor(currc / divider)) % 3 !== 0)
            return false;
        curra = curra % divider;
        currb = currb % divider;
        currc = currc % divider;
        divider = Math.floor(divider / 3);
    }
    return true;
};

JewelGrid.prototype.reset = function () {
    this.clear();
    for (var i = 0; i < this._rows * this._columns; i += 1)
        this.add(new Jewel(ID.layer_objects));
};

JewelGrid.prototype.removeJewel = function (x, y, newYPosition) {
    for (var row = y; row > 0; row -= 1)
        this._gameObjects[row * this._columns + x] = this._gameObjects[(row - 1) * this._columns + x];
    var jewel = new Jewel();
    this.addAt(jewel, x, 0);
    jewel.position.y = newYPosition;
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

JewelGrid.prototype.getAnchorPosition = function (gameobject) {
    var l = this._gameObjects.length;
    for (var i = 0; i < l; ++i)
        if (this._gameObjects[i] == gameobject) {
            var row = Math.floor(i / this.columns);
            var col = i - row * this.columns;
            return new Vector2(col * this.cellWidth, row * this.cellHeight);
        }
    return Vector2.zero;
};