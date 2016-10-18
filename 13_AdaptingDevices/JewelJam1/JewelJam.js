"use strict";

var sprites = {};
var sounds = {};

Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return Game.loadSprite("../../assets/JewelJam/sprites/" + sprite);
    };

    var loadSound = function (sound, looping) {
        return new Sound("../../assets/JewelJam/sounds/" + sound, looping);
    };

    sprites.background = loadSprite("spr_background.jpg");
    sprites.jewel = loadSprite("spr_single_jewel1.png");
};

Game.initialize = function () {
    Game.gameWorld = new JewelJamGameWorld();
};













