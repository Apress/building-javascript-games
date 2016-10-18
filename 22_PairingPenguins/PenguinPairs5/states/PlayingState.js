"use strict";

function PlayingState() {
    IGameLoopObject.call(this);

    this.currentLevelIndex = -1;
    this.levels = [];

    this.loadLevelsStatus();
    this.loadLevels();
}

PlayingState.prototype = Object.create(IGameLoopObject.prototype);

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
    if (levelIndex < 0 || levelIndex >= window.LEVELS.length)
        return;
    this.currentLevelIndex = levelIndex;
    this.currentLevel.reset();
};

PlayingState.prototype.loadLevels = function () {
    for (var currLevel = 0; currLevel < window.LEVELS.length; currLevel++)
        this.levels.push(new Level(currLevel));
};

PlayingState.prototype.loadLevelsStatus = function () {
    if (localStorage && localStorage.penguinPairsLevels) {
        window.LEVELS = JSON.parse(localStorage.penguinPairsLevels);
    }
};

PlayingState.prototype.writeLevelsStatus = function () {
    if (!localStorage)
        return;
    localStorage.penguinPairsLevels = JSON.stringify(window.LEVELS);
};