/*

 Note that if you run the CollisionTest example from a local file, it only works in browsers that allow
 reading canvas pixel data we a web application is run locally. Chrome doesn't allow this for example, but
 Firefox and Internet Explorer do.

 */

"use strict";

var ID = {};
var sprites = {};

powerupjs.Game.loadAssets = function () {
    var loadSprite = function (sprite, collisionMask) {
        return new powerupjs.SpriteSheet("assets/sprites/" + sprite, collisionMask);
    };

    sprites.run = loadSprite("spr_run@13.png", true);
    sprites.idle = loadSprite("spr_idle.png", true);
    sprites.sparky_idle = loadSprite("spr_sparky_idle.png", true);
    sprites.sparky_electrocute = loadSprite("spr_sparky_electrocute@6x5.png");
};

powerupjs.Game.initialize = function () {
    ID.game_state_main = powerupjs.GameStateManager.add(new MainState());
    powerupjs.GameStateManager.switchTo(ID.game_state_main);
};