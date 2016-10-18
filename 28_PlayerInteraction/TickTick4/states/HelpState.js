"use strict";

function HelpState(layer) {
    powerupjs.GameObjectList.call(this, layer);

    // the background
    var background = new powerupjs.SpriteGameObject(sprites.background_help, ID.layer_background);
    this.add(background);

    // add a back button
    this.backButton = new powerupjs.Button(sprites.button_back, ID.layer_overlays);
    this.backButton.position = new powerupjs.Vector2(this.backButton.screenCenterX, 750);
    this.add(this.backButton);
}
HelpState.prototype = Object.create(powerupjs.GameObjectList.prototype);

HelpState.prototype.handleInput = function (delta) {
    powerupjs.GameObjectList.prototype.handleInput.call(this, delta);
    if (this.backButton.pressed)
        powerupjs.GameStateManager.switchTo(ID.game_state_title);
};