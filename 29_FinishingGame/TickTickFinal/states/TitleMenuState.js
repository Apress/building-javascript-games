"use strict";

function TitleMenuState(layer) {
    powerupjs.GameObjectList.call(this, layer);

    // the title screen
    var titleScreen = new powerupjs.SpriteGameObject(sprites.background_title, ID.layer_background);
    this.add(titleScreen);

    // add a play button
    this.playButton = new powerupjs.Button(sprites.button_play, ID.layer_overlays);
    this.playButton.position = new powerupjs.Vector2(this.playButton.screenCenterX, 540);
    this.add(this.playButton);

    // add a help button
    this.helpButton = new powerupjs.Button(sprites.button_help, ID.layer_overlays);
    this.helpButton.position = new powerupjs.Vector2(this.helpButton.screenCenterX, 600);
    this.add(this.helpButton);
}

TitleMenuState.prototype = Object.create(powerupjs.GameObjectList.prototype);

TitleMenuState.prototype.handleInput = function (delta) {
    powerupjs.GameObjectList.prototype.handleInput.call(this, delta);
    if (this.playButton.pressed)
        powerupjs.GameStateManager.switchTo(ID.game_state_levelselect);
    else if (this.helpButton.pressed)
        powerupjs.GameStateManager.switchTo(ID.game_state_help);
};