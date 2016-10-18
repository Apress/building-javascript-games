"use strict";

var sprites = {};

window.requestAnimationFrame =  window.requestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.oRequestAnimationFrame ||
                                window.msRequestAnimationFrame ||
                                function (callback) {
                                    window.setTimeout(callback, 1000 / 60);
                                };

var Game = {
    spritesStillLoading : 0
};

Game.start = function (canvasName) {
    Canvas2D.initialize(canvasName);
    Keyboard.initialize();
    Mouse.initialize();
    Game.loadAssets();
    Game.assetLoadingLoop();
};

Game.initialize = function() {
    cannon.initialize();
};

Game.handleInput = function () {
    cannon.handleInput();
};

Game.update = function () {
};

Game.draw = function () {
    Canvas2D.clear();
    Canvas2D.drawImage(sprites.background, { x : 0, y : 0 }, 0, { x : 0, y : 0 });
    cannon.draw();
};

Game.loadAssets = function () {
    var spriteFolder = "../../assets/Painter/sprites/";

    sprites.background = Game.loadSprite(spriteFolder + "spr_background.jpg");
    sprites.cannon_barrel = Game.loadSprite(spriteFolder + "spr_cannon_barrel.png");
    sprites.cannon_red = Game.loadSprite(spriteFolder + "spr_cannon_red.png");
    sprites.cannon_green = Game.loadSprite(spriteFolder + "spr_cannon_green.png");
    sprites.cannon_blue = Game.loadSprite(spriteFolder + "spr_cannon_blue.png");
};

Game.loadSprite = function (imageName) {
    var image = new Image();
    image.src = imageName;
    Game.spritesStillLoading += 1;
    image.onload = function () {
        Game.spritesStillLoading -= 1;
    };
    return image;
};

Game.assetLoadingLoop = function () {
    if (Game.spritesStillLoading > 0)
        window.requestAnimationFrame(Game.assetLoadingLoop);
    else {
        Game.initialize();
        Game.mainLoop();
    }
};

Game.mainLoop = function () {
    Game.handleInput();
    Game.update();
    Game.draw();
    Mouse.reset();
    window.requestAnimationFrame(Game.mainLoop);
};