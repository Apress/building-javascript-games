"use strict";

function GameOverState() {
    powerupjs.GameObjectList.call(this);
    this.playingState = powerupjs.GameStateManager.get(ID.game_state_playing);
    this.overlay = new powerupjs.SpriteGameObject(sprites.overlay_gameover, ID.layer_overlays);
    this.overlay.position = this.overlay.screenCenter;
    this.add(this.overlay);
}
GameOverState.prototype = Object.create(powerupjs.GameObjectList.prototype);

GameOverState.prototype.handleInput = function (delta) {
    if (powerupjs.Touch.isTouchDevice) {
        if (!powerupjs.Touch.containsTouch(this.overlay.boundingBox))
            return;
    }
    else if (!powerupjs.Mouse.containsMousePress(this.overlay.boundingBox))
        return;
    this.playingState.reset();
    powerupjs.GameStateManager.switchTo(ID.game_state_playing);
};

GameOverState.prototype.update = function (delta) {
    this.playingState.update(delta);
};

GameOverState.prototype.draw = function () {
    this.playingState.draw();
    powerupjs.GameObjectList.prototype.draw.call(this);
};