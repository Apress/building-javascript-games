"use strict";

function HelpState(layer) {
    GameObjectList.call(this, layer);

    // the background
    var background = new SpriteGameObject(sprites.background_help);
    this.add(background);

    // add a back button
    this.backButton = new Button(sprites.button_back, 100);
    this.backButton.position = new Vector2(415, 720);
    this.add(this.backButton);
}

HelpState.prototype = Object.create(GameObjectList.prototype);

HelpState.prototype.handleInput = function (delta) {
    GameObjectList.prototype.handleInput.call(this, delta);
    if (this.backButton.pressed)
        GameStateManager.switchTo(ID.game_state_title);
};