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

    sprites.background_title = loadSprite("spr_background_title.jpg");
    sprites.background_help = loadSprite("spr_background_help.jpg");
    sprites.background_level = loadSprite("spr_background_level.jpg");
    sprites.background_levelselect = loadSprite("spr_background_levelselect.jpg");
    sprites.background_options = loadSprite("spr_background_options.jpg");
    sprites.button_back = loadSprite("spr_button_back.jpg");
    sprites.button_help = loadSprite("spr_button_help.jpg");
    sprites.button_hint = loadSprite("spr_button_hint.png");
    sprites.button_offon = loadSprite("spr_button_offon@2.png");
    sprites.button_options = loadSprite("spr_button_options.jpg");
    sprites.button_play = loadSprite("spr_button_play.jpg");
    sprites.button_quit = loadSprite("spr_button_quit.png");
    sprites.button_retry = loadSprite("spr_button_retry.png");
    sprites.help = loadSprite("spr_help.jpg");
    sprites.level_unsolved = loadSprite("spr_level_unsolved.png");
    sprites.level_solved = loadSprite("spr_level_solved@6.png");
    sprites.level_locked = loadSprite("spr_lock.png");
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

    // create the different game modes
    ID.game_state_title = GameStateManager.add(new TitleMenuState());
    ID.game_state_help = GameStateManager.add(new HelpState());
    ID.game_state_options = GameStateManager.add(new OptionsMenuState());
    ID.game_state_levelselect = GameStateManager.add(new LevelMenuState());

    // set the current game mode
    GameStateManager.switchTo(ID.game_state_title);
};