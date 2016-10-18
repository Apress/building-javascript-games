"use strict";

function OptionsMenuState(layer) {
    GameObjectList.call(this, layer);

    var background = new SpriteGameObject(sprites.background_options, ID.layer_background);
    this.add(background);

    var onOffLabel = new Label("Arial", "60px", ID.layer_overlays);
    onOffLabel.text = "Hints";
    onOffLabel.position = new Vector2(150, 360);
    onOffLabel.color = Color.darkBlue;
    this.add(onOffLabel);

    this.onOffButton = new OnOffButton(sprites.button_offon, ID.layer_overlays);
    this.onOffButton.position = new Vector2(650, 340);
    this.onOffButton.on = GameSettings.hints;
    this.add(this.onOffButton);

    var musicText = new Label("Arial", "60px", ID.layer_overlays);
    musicText.text = "Music volume";
    musicText.position = new Vector2(150, 490);
    musicText.color = Color.darkBlue;
    this.add(musicText);

    this.musicSlider = new Slider(sprites.slider_bar, sprites.slider_button, ID.layer_overlays);
    this.musicSlider.position = new Vector2(650, 500);
    this.musicSlider.value = sounds.music.volume;
    this.add(this.musicSlider);

    this.backButton = new Button(sprites.button_back, ID.layer_overlays);
    this.backButton.position = new Vector2(415, 720);
    this.add(this.backButton);
}

OptionsMenuState.prototype = Object.create(GameObjectList.prototype);

OptionsMenuState.prototype.handleInput = function (delta) {
    GameObjectList.prototype.handleInput.call(this, delta);
    if (this.backButton.pressed)
        GameStateManager.switchTo(ID.game_state_title);
};

OptionsMenuState.prototype.update = function (delta) {
    GameObjectList.prototype.update.call(this, delta);
    sounds.music.volume = this.musicSlider.value;
    GameSettings.hints = this.onOffButton.on;
};