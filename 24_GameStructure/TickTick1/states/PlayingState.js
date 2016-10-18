"use strict";

function PlayingState() {
    powerupjs.IGameLoopObject.call(this);

    this.currentLevelIndex = -1;
    this.levels = [];

    this.loadLevelsStatus();
    this.loadLevels();
}

PlayingState.prototype = Object.create(powerupjs.IGameLoopObject.prototype);

Object.defineProperty(PlayingState.prototype, "currentLevel", {
    get: function () {
        return this.levels[this.currentLevelIndex];
    }
});

PlayingState.prototype.handleInput = function (delta) {
    this.currentLevel.handleInput(delta);
};

PlayingState.prototype.update = function (delta) {
    this.currentLevel.update(delta);
};

PlayingState.prototype.draw = function () {
    this.currentLevel.draw();
};

PlayingState.prototype.reset = function () {
    this.currentLevel.reset();
};

PlayingState.prototype.goToLevel = function (levelIndex) {
    if (levelIndex < 0 || levelIndex >= this.levels.length)
        return;
    this.currentLevelIndex = levelIndex;
    this.currentLevel.reset();
};

PlayingState.prototype.nextLevel = function () {
    if (this.currentLevelIndex >= window.LEVELS.length - 1)
        powerupjs.GameStateManager.switchTo(ID.game_state_levelselect);
    else {
        this.goToLevel(this.currentLevelIndex + 1);
        window.LEVELS[this.currentLevelIndex].locked = false;
    }
    this.writeLevelsStatus();
};

PlayingState.prototype.loadLevels = function () {
    for (var currLevel = 0; currLevel < window.LEVELS.length; currLevel += 1) {
        this.levels.push(new Level(currLevel));
    }
};

PlayingState.prototype.loadLevelsStatus = function () {
    if (localStorage && localStorage.tickTickLevels) {
        window.LEVELS = JSON.parse(localStorage.tickTickLevels);
    }
};

PlayingState.prototype.writeLevelsStatus = function () {
    if (!localStorage)
        return;
    localStorage.tickTickLevels = JSON.stringify(window.LEVELS);
};