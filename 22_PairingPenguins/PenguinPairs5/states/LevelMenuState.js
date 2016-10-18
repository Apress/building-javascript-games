"use strict";

function LevelMenuState(layer) {
    GameObjectList.call(this, layer);

    this.background = new SpriteGameObject(sprites.background_levelselect, ID.layer_background);
    this.add(this.background);

    this.back = new Button(sprites.button_back, ID.layer_overlays);
    this.back.position = new Vector2(this.back.screenCenterX, 750);
    this.add(this.back);

    this.levelButtons = [];

    for (var i = 0; i < window.LEVELS.length; i += 1) {
        var row = Math.floor(i / 5);
        var column = i % 5;
        var level = new LevelButton(i, ID.layer_overlays);
        level.position = new Vector2(column * (level.width + 30) + 155,
            row * (level.height + 5) + 230);
        //console.log("Level " + i + " at position " + level.position);
        this.add(level);
        this.levelButtons.push(level);
    }
}

LevelMenuState.prototype = Object.create(GameObjectList.prototype);

LevelMenuState.prototype.getSelectedLevel = function () {
    for (var i = 0, j = this.levelButtons.length; i < j; i += 1) {
        if (this.levelButtons[i].pressed)
            return this.levelButtons[i].levelIndex;
    }
    return -1;
};

LevelMenuState.prototype.handleInput = function (delta) {
    GameObjectList.prototype.handleInput.call(this, delta);

    var selectedLevel = this.getSelectedLevel();
    if (selectedLevel != -1) {
        var playingState = GameStateManager.get(ID.game_state_playing);
        playingState.goToLevel(selectedLevel);
        GameStateManager.switchTo(ID.game_state_playing);
    }
    else if (this.back.pressed)
        GameStateManager.switchTo(ID.game_state_title);
};