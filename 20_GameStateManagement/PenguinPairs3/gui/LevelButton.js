"use strict";

function LevelButton(levelIndex, layer, id) {
    GameObjectList.call(this, layer, id);

    this.pressed = false;
    this.levelIndex = levelIndex;
    this._levelSolved = new SpriteGameObject(sprites.level_solved, ID.layer_overlays);
    this._levelUnsolved = new SpriteGameObject(sprites.level_unsolved, ID.layer_overlays);
    this._levelLocked = new SpriteGameObject(sprites.level_locked, ID.layer_overlays_2);

    this._levelSolved.sheetIndex = levelIndex;
    this.add(this._levelSolved);
    this.add(this._levelUnsolved);
    this.add(this._levelLocked);

    var textLabel = new Label("Arial", "20px", ID.layer_overlays_1);
    textLabel.text = levelIndex + 1;
    textLabel.position = new Vector2(this._levelSolved.width - textLabel.width,
        this._levelSolved.height - textLabel.height + 50).divideBy(2);
    textLabel.color = Color.black;
    this.add(textLabel);
}

LevelButton.prototype = Object.create(GameObjectList.prototype);

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
    if (Touch.isTouchDevice)
        this.pressed = this.visible && Touch.containsTouchPress(this._levelLocked.boundingBox);
    else
        this.pressed = this.visible && Mouse.left.pressed &&
            this._levelLocked.boundingBox.contains(Mouse.position);
};
