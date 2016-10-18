"use strict";

var requestAnimationFrame = (function () {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Game_Singleton() {
    console.log("Creating game");
    this._totalTime = 0;
    this._size = null;
    this._spritesStillLoading = 0;
    this.gameWorld = null;
}

Object.defineProperty(Game_Singleton.prototype, "totalTime",
    {
        get: function () {
            return this._totalTime;
        }
    });

Object.defineProperty(Game_Singleton.prototype, "size",
    {
        get: function () {
            return this._size;
        }
    });

Game_Singleton.prototype.start = function (canvasName, x, y) {
    this._size = new Vector2(x, y);

    Canvas2D.initialize(canvasName);
    this.loadAssets();
    this.assetLoadingLoop();
};

Game_Singleton.prototype.initialize = function () {
};

Game_Singleton.prototype.loadAssets = function () {
};

Game_Singleton.prototype.loadSprite = function (imageName) {
    console.log("Loading sprite: " + imageName);
    var image = new Image();
    image.src = imageName;
    this._spritesStillLoading += 1;
    image.onload = function () {
        Game._spritesStillLoading -= 1;
    };
    return image;
};

Game_Singleton.prototype.assetLoadingLoop = function () {
    if (!this._spritesStillLoading > 0)
        requestAnimationFrame(Game.assetLoadingLoop);
    else {
        Game.initialize();
        requestAnimationFrame(Game.mainLoop);
    }
};

Game_Singleton.prototype.mainLoop = function () {
    var delta = 1 / 60;
    Game._totalTime += delta;

    Game.gameWorld.handleInput(delta);
    Game.gameWorld.update(delta);
    Canvas2D.clear();
    Game.gameWorld.draw();

    Keyboard.reset();
    Mouse.reset();
    Touch.reset();

    requestAnimationFrame(Game.mainLoop);
};

var Game = new Game_Singleton();

