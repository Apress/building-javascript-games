"use strict";

var powerupjs = (function (powerupjs) {

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
                return new powerupjs.Rectangle(0, 0, this._size.x, this._size.y);
            }
        });

    Game_Singleton.prototype.start = function (divName, canvasName, x, y) {
        this._size = new powerupjs.Vector2(x, y);

        powerupjs.Canvas2D.initialize(divName, canvasName);
        this.loadAssets();
        this.assetLoadingLoop();
    };

    Game_Singleton.prototype.initialize = function () {
    };

    Game_Singleton.prototype.loadAssets = function () {
    };

    Game_Singleton.prototype.assetLoadingLoop = function () {
        powerupjs.Canvas2D.clear();
        powerupjs.Canvas2D.drawText(Math.round((powerupjs.Game._totalSprites - powerupjs.Game._spritesStillLoading) /
            powerupjs.Game._totalSprites * 100) + "%");

        if (powerupjs.Game._spritesStillLoading > 0)
            requestAnimationFrame(powerupjs.Game.assetLoadingLoop);
        else {
            powerupjs.Game.initialize();
            requestAnimationFrame(powerupjs.Game.mainLoop);
        }
    };

    Game_Singleton.prototype.mainLoop = function () {
        var delta = 1 / 60;
        powerupjs.Game._totalTime += delta;

        powerupjs.GameStateManager.handleInput(delta);
        powerupjs.GameStateManager.update(delta);
        powerupjs.Canvas2D.clear();
        powerupjs.GameStateManager.draw();

        powerupjs.Keyboard.reset();
        powerupjs.Mouse.reset();
        powerupjs.Touch.reset();

        requestAnimationFrame(powerupjs.Game.mainLoop);
    };

    powerupjs.Game = new Game_Singleton();
    return powerupjs;

}(powerupjs || {}));
