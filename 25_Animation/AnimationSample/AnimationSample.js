"use strict";

var ID = {};
var sprites = {};

powerupjs.Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return new powerupjs.SpriteSheet("../../assets/TickTick/sprites/player/" + sprite);
    };

    sprites.run = loadSprite("spr_run@13.png");
    sprites.idle = loadSprite("spr_idle.png");
};

powerupjs.Game.initialize = function () {
    ID.game_state_animation = powerupjs.GameStateManager.add(new AnimationState());
    powerupjs.GameStateManager.switchTo(ID.game_state_animation);
};