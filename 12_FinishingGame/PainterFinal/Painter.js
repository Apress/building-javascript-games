"use strict";

var sprites = {};
var sounds = {};

Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return Game.loadSprite("../../assets/Painter/sprites/" + sprite);
    };

    var loadSound = function (sound, looping) {
        return new Sound("../../assets/Painter/sounds/" + sound, looping);
    };

    sprites.background = loadSprite("spr_background.jpg");
    sprites.scorebar = loadSprite("spr_scorebar.jpg");
    sprites.cannon_barrel = loadSprite("spr_cannon_barrel.png");
    sprites.cannon_red = loadSprite("spr_cannon_red.png");
    sprites.cannon_green = loadSprite("spr_cannon_green.png");
    sprites.cannon_blue = loadSprite("spr_cannon_blue.png");
    sprites.ball_red = loadSprite("spr_ball_red.png");
    sprites.ball_green = loadSprite("spr_ball_green.png");
    sprites.ball_blue = loadSprite("spr_ball_blue.png");
    sprites.can_red = loadSprite("spr_can_red.png");
    sprites.can_green = loadSprite("spr_can_green.png");
    sprites.can_blue = loadSprite("spr_can_blue.png");
    sprites.lives = loadSprite("spr_lives.png");
    sprites.gameover = loadSprite("spr_gameover_click.png");

    sounds.music = loadSound("snd_music");
    sounds.collect_points = loadSound("snd_collect_points");
    sounds.shoot_paint = loadSound("snd_shoot_paint");
};

Game.initialize = function () {
    // sound
    sounds.music.volume = 0.3;
    sounds.music.play();

    // create the game world
    Game.gameWorld = new PainterGameWorld();
};