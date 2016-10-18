"use strict";

function GameStateManager_Singleton() {
    this._gameStates = [];
    this._currentGameState = null;
}

GameStateManager_Singleton.prototype.add = function (gamestate) {
    this._gameStates.push(gamestate);
    this._currentGameState = gamestate;
    return this._gameStates.length - 1;
};

GameStateManager_Singleton.prototype.get = function (id) {
    if (id < 0 || id >= this._gameStates.length)
        return null;
    else
        return this._gameStates[id];
};

GameStateManager_Singleton.prototype.switchTo = function (id) {
    if (id < 0 || id >= this._gameStates.length)
        return;
    this._currentGameState = this._gameStates[id];
};

GameStateManager_Singleton.prototype.handleInput = function (delta) {
    if (this._currentGameState != null)
        this._currentGameState.handleInput(delta);
};

GameStateManager_Singleton.prototype.update = function (delta) {
    if (this._currentGameState != null)
        this._currentGameState.update(delta);
};

GameStateManager_Singleton.prototype.draw = function () {
    if (this._currentGameState != null)
        this._currentGameState.draw();
};

GameStateManager_Singleton.prototype.reset = function () {
    if (this._currentGameState != null)
        this._currentGameState.reset();
};

var GameStateManager = new GameStateManager_Singleton();
