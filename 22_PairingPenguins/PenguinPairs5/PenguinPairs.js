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

    sprites.arrow = loadSprite("spr_arrow@4.png");
    sprites.arrow_hover = loadSprite("spr_arrow_hover@4.png");
    sprites.arrow_hint = loadSprite("spr_arrow_hint@4.png");
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
    sprites.field = loadSprite("spr_field@2.png");
    sprites.frame_goal = loadSprite("spr_frame_goal.jpg");
    sprites.help = loadSprite("spr_help.jpg");
    if (Touch.isTouchDevice)
        sprites.level_finished = loadSprite("spr_level_finished_tap.png");
    else
        sprites.level_finished = loadSprite("spr_level_finished_click.png");
    sprites.level_unsolved = loadSprite("spr_level_unsolved.png");
    sprites.level_solved = loadSprite("spr_level_solved@6.png");
    sprites.level_locked = loadSprite("spr_lock.png");
    sprites.penguin = loadSprite("spr_penguin@8.png");
    sprites.penguin_boxed = loadSprite("spr_penguin_boxed@8.png");
    sprites.penguin_empty = loadSprite("spr_penguin_empty.png");
    sprites.penguin_pairs = loadSprite("spr_penguin_pairs@8.png");
    sprites.shark = loadSprite("spr_shark.png");
    sprites.slider_bar = loadSprite("spr_slider_bar.jpg");
    sprites.slider_button = loadSprite("spr_slider_button.jpg");
    sprites.wall = loadSprite("spr_wall.png");

    sounds.music = loadSound("snd_music", true);
    sounds.eat = loadSound("snd_eat");
    sounds.lost = loadSound("snd_lost");
    sounds.won = loadSound("snd_won");
    sounds.pair = loadSound("snd_pair");
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

    // define object IDs
    ID.tiles = 1;
    ID.pairList = 2;
    ID.animalSelector = 3;

    // create the different game modes
    ID.game_state_title = GameStateManager.add(new TitleMenuState());
    ID.game_state_help = GameStateManager.add(new HelpState());
    ID.game_state_options = GameStateManager.add(new OptionsMenuState());
    ID.game_state_playing = GameStateManager.add(new PlayingState());
    ID.game_state_levelselect = GameStateManager.add(new LevelMenuState());

    // set the current game mode
    GameStateManager.switchTo(ID.game_state_title);
};