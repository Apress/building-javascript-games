"use strict";

window.requestAnimationFrame =  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

var Game = {
    spritesStillLoading : 0,
    gameWorld : undefined
}

Game.start = function (canvasName, x, y) {
    Canvas2D.initialize(canvasName);
    Game.size = { x : x, y : y };
    Keyboard.initialize();
    Mouse.initialize();
    Game.loadAssets();
    Game.assetLoadingLoop();
};

Game.loadAssets = function () {
};

Game.loadSprite = function (imageName) {
    console.log("Loading sprite: " + imageName);
    var image = new Image();
    image.src = imageName;
    this.spritesStillLoading += 1;
    image.onload = function () {
        Game.spritesStillLoading -= 1;
    };
    return image;
};

Game.assetLoadingLoop = function () {
    if (!Game.spritesStillLoading > 0)
        window.requestAnimationFrame(Game.assetLoadingLoop);
    else {
        Game.initialize();
        window.requestAnimationFrame(Game.mainLoop);
    }
};

Game.mainLoop = function () {
    var delta = 1 / 60;

    Game.gameWorld.handleInput(delta);
    Game.gameWorld.update(delta);
    Canvas2D.clear();
    Game.gameWorld.draw();
    Mouse.reset();
    requestAnimationFrame(Game.mainLoop);
};

