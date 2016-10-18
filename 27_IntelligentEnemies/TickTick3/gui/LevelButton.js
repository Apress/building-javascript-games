"use strict";

function LevelButton(levelIndex, layer, id) {
    powerupjs.GameObjectList.call(this, layer, id);

    this.pressed = false;
    this.levelIndex = levelIndex;
    this._levelSolved = new powerupjs.SpriteGameObject(sprites.level_solved, ID.layer_overlays_1);
    this._levelUnsolved = new powerupjs.SpriteGameObject(sprites.level_unsolved, ID.layer_overlays);

    this._levelSolved.sheetIndex = levelIndex;
    this.add(this._levelSolved);
    this.add(this._levelUnsolved);

    this._levelLocked = new powerupjs.SpriteGameObject(sprites.level_locked, ID.layer_overlays_1);
    this.add(this._levelLocked);

    var textLabel = new powerupjs.Label("Arial", "20px", ID.layer_overlays_2);
    textLabel.text = levelIndex + 1;
    textLabel.position = new powerupjs.Vector2(this._levelSolved.width - textLabel.width - 10, 10);
    textLabel.color = powerupjs.Color.white;
    this.add(textLabel);
}

LevelButton.prototype = Object.create(powerupjs.GameObjectList.prototype);

Object.defineProperty(LevelButton.prototype, "width",
    {
        get: function () {
            return this._levelLocked.width;
        }
    });

Object.defineProperty(LevelButton.prototype, "height",
    {
        get: function () {
            return this._levelLocked.height;
        }
    });

LevelButton.prototype.handleInput = function (delta) {
    if (window.LEVELS[this.levelIndex].locked)
        return;
    if (powerupjs.Touch.isTouchDevice)
        this.pressed = this.visible && powerupjs.Touch.containsTouch(this._levelLocked.boundingBox);
    else
        this.pressed = this.visible && powerupjs.Mouse.left.pressed &&
            this._levelLocked.boundingBox.contains(powerupjs.Mouse.position);
};

LevelButton.prototype.update = function (delta) {
    powerupjs.GameObjectList.prototype.update.call(this, delta);
    var currLevel = window.LEVELS[this.levelIndex];
    this._levelLocked.visible = currLevel.locked;
    this._levelSolved.visible = currLevel.solved;
    this._levelUnsolved.visible = !currLevel.solved;
};