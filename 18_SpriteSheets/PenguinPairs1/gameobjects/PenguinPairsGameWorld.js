"use strict";

function PenguinPairsGameWorld(layer, id) {
    GameObjectList.call(this, layer, id);

    this.add(new SpriteGameObject(sprites.background_level, ID.layer_background));

    this.penguin = new SpriteGameObject(sprites.penguin, ID.layer_objects);
    this.penguin.position = new Vector2(500, 420);
    this.add(this.penguin);

}

PenguinPairsGameWorld.prototype = Object.create(GameObjectList.prototype);

PenguinPairsGameWorld.prototype.handleInput = function (delta) {
    if (Keyboard.pressed(Keys.left))
        this.penguin.sheetIndex--;
    else if (Keyboard.pressed(Keys.right))
        this.penguin.sheetIndex++;
};