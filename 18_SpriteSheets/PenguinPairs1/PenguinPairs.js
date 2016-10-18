"use strict";

var ID = {};
var sprites = {};
var sounds = {};

Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return new SpriteSheet("../../assets/PenguinPairs/sprites/" + sprite);
    };

    var loadSound = function (sound, looping) {
        return new Sound("../../assets/PenguinPairs/sounds/" + sound, looping);
    };

    sprites.background_level = loadSprite("spr_background_level.jpg");
    sprites.penguin = loadSprite("spr_penguin@4x2.png");
};

Game.initialize = function () {

    // define the layers
    ID.layer_background = 1;
    ID.layer_background_1 = 2;
    ID.layer_background_2 = 3;
    ID.layer_background_3 = 4;
    ID.layer_tiles = 10;
    ID.layer_objects = 20;
    ID.layer_objects_1 = 21;
    ID.layer_objects_2 = 22;
    ID.layer_overlays = 30;
    ID.layer_overlays_1 = 31;
    ID.layer_overlays_2 = 32;

    // create the game world
    Game.gameWorld = new PenguinPairsGameWorld();
};