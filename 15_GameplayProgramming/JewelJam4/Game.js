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
    this._totalTime = 0;
    this._size = null;
    this._spritesStillLoading = 0;
    this._totalSprites = 0;
    this.gameWorld = null;

    // for debugging
    this.log = "";
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

Object.defineProperty(Game_Singleton.prototype, "screenRect",
    {
        get: function () {
            return new Rectangle(0, 0, this._size.x, this._size.y);
        }
    });

Game_Singleton.prototype.loadSprite = function (imageName) {
    console.log("Loading sprite: " + imageName);
    var image = new Image();
    image.src = imageName;
    this._spritesStillLoading += 1;
    this._totalSprites += 1;
    image.onload = function () {
        Game._spritesStillLoading -= 1;
    };
    return image;
};

Game_Singleton.prototype.start = function (divName, canvasName, x, y) {
    this._size = new Vector2(x, y);
    Canvas2D.initialize(divName, canvasName);
    this.loadAssets();
    this.assetLoadingLoop();
};

Game_Singleton.prototype.initialize = function () {
};

Game_Singleton.prototype.loadAssets = function () {
};

Game_Singleton.prototype.assetLoadingLoop = function () {
    Canvas2D.clear();
    Canvas2D.drawText(Math.round((Game._totalSprites - Game._spritesStillLoading) /
        Game._totalSprites * 100) + "%");

    if (Game._spritesStillLoading > 0)
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

    // displaying the number of touches
    Canvas2D.drawText(Game.log);

    Keyboard.reset();
    Mouse.reset();
    Touch.reset();

    requestAnimationFrame(Game.mainLoop);
};

var Game = new Game_Singleton();