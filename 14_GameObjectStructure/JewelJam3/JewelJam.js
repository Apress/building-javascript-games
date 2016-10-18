"use strict";

var ID = {};
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
    sprites.single_jewel1 = loadSprite("spr_single_jewel1.png");
    sprites.single_jewel2 = loadSprite("spr_single_jewel2.png");
    sprites.single_jewel3 = loadSprite("spr_single_jewel3.png");
};

Game.initialize = function () {
    // define the layers
    ID.layer_background = 1;
    ID.layer_objects = 20;

    // create the game world
    Game.gameWorld = new JewelJamGameWorld();
};













