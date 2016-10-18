"use strict";

function LevelMenuState(layer) {
    powerupjs.GameObjectList.call(this, layer);

    this.background = new powerupjs.SpriteGameObject(sprites.levelselect, ID.layer_background);
    this.add(this.background);

    this.back = new powerupjs.Button(sprites.button_back, ID.layer_overlays);
    this.back.position = new powerupjs.Vector2(this.back.screenCenterX, 750);
    this.add(this.back);

    this.levelButtons = [];

    for (var i = 0, j = window.LEVELS.length; i < j; ++i) {
        var row = Math.floor(i / 4);
        var column = i % 4;
        var level = new LevelButton(i, ID.layer_overlays);
        level.position = new powerupjs.Vector2(column * (level.width + 20) + 390, row * (level.height + 20) + 180);
        this.add(level);
        this.levelButtons.push(level);
    }
}

LevelMenuState.prototype = Object.create(powerupjs.GameObjectList.prototype);

LevelMenuState.prototype.getSelectedLevel = function () {
    for (var i = 0, j = this.levelButtons.length; i < j; i++) {
        if (this.levelButtons[i].pressed)
            return this.levelButtons[i].levelIndex;
    }
    return -1;
};

LevelMenuState.prototype.handleInput = function (delta) {
    powerupjs.GameObjectList.prototype.handleInput.call(this, delta);

    var selectedLevel = this.getSelectedLevel();
    if (selectedLevel != -1) {
        var playingState = powerupjs.GameStateManager.get(ID.game_state_playing);
        playingState.goToLevel(selectedLevel);
        powerupjs.GameStateManager.switchTo(ID.game_state_playing);
    }
    else if (this.back.pressed)
        powerupjs.GameStateManager.switchTo(ID.game_state_title);
};