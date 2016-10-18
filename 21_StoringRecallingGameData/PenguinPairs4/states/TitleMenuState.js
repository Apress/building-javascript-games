"use strict";

function TitleMenuState(layer) {
    GameObjectList.call(this, layer);

    var background = new SpriteGameObject(sprites.background_title, ID.layer_background);
    this.add(background);

    this.playButton = new Button(sprites.button_play, ID.layer_overlays);
    this.playButton.position = new Vector2(415, 540);
    this.add(this.playButton);

    this.optionsButton = new Button(sprites.button_options, ID.layer_overlays);
    this.optionsButton.position = new Vector2(415, 650);
    this.add(this.optionsButton);

    this.helpButton = new Button(sprites.button_help, ID.layer_overlays);
    this.helpButton.position = new Vector2(415, 760);
    this.add(this.helpButton);
}

TitleMenuState.prototype = Object.create(GameObjectList.prototype);

TitleMenuState.prototype.handleInput = function (delta) {
    GameObjectList.prototype.handleInput.call(this, delta);
    if (this.playButton.pressed)
        GameStateManager.switchTo(ID.game_state_levelselect);
    else if (this.helpButton.pressed)
        GameStateManager.switchTo(ID.game_state_help);
    else if (this.optionsButton.pressed)
        GameStateManager.switchTo(ID.game_state_options);
};