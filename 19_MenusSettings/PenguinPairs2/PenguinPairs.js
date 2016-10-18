"use strict";

var ID = {};
var sprites = {};
var sounds = {};

var GameSettings = {
    hints: true
};

Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return new SpriteSheet("../../assets/PenguinPairs/sprites/" + sprite);
    };

    var loadSound = function (sound, looping) {
        return new Sound("../../assets/PenguinPairs/sounds/" + sound, looping);
    };

    sprites.background_options = loadSprite("spr_background_options.jpg");
    sprites.button_back = loadSprite("spr_button_back.jpg");
    sprites.button_offon = loadSprite("spr_button_offon@2.png");
    sprites.slider_bar = loadSprite("spr_slider_bar.jpg");
    sprites.slider_button = loadSprite("spr_slider_button.jpg");

    sounds.music = loadSound("snd_music", true);
};

Game.initialize = function () {
    // play the music
    sounds.music.volume = 0.3;
    sounds.music.play();

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