"use strict";

function LevelFinishedState() {
    powerupjs.GameObjectList.call(this);
    this.playingState = powerupjs.GameStateManager.get(ID.game_state_playing);
    this.overlay = new powerupjs.SpriteGameObject(sprites.overlay_welldone, ID.layer_overlays);
    this.overlay.position = this.overlay.screenCenter;
    this.add(this.overlay);
}

LevelFinishedState.prototype = Object.create(powerupjs.GameObjectList.prototype);

LevelFinishedState.prototype.handleInput = function (delta) {
    if (powerupjs.Touch.isTouchDevice) {
        if (!powerupjs.Touch.containsTouch(this.overlay.boundingBox))
            return;
    }
    else if (!powerupjs.Mouse.containsMousePress(this.overlay.boundingBox))
        return;
    powerupjs.GameStateManager.switchTo(ID.game_state_playing);
    this.playingState.nextLevel();
};

LevelFinishedState.prototype.update = function (delta) {
    this.playingState.update(delta);
};

LevelFinishedState.prototype.draw = function () {
    this.playingState.draw();
    powerupjs.GameObjectList.prototype.draw.call(this);
};