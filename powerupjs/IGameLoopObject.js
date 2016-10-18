"use strict";

var powerupjs = (function (powerupjs) {

    function IGameLoopObject() {
    }

    IGameLoopObject.prototype.initialize = function () {
    };

    IGameLoopObject.prototype.handleInput = function (delta) {
    };

    IGameLoopObject.prototype.update = function (delta) {
    };

    IGameLoopObject.prototype.draw = function () {
    };

    IGameLoopObject.prototype.reset = function () {
    };

    powerupjs.IGameLoopObject = IGameLoopObject;
    return powerupjs;

})(powerupjs || {});