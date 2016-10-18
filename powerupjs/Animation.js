"use strict";

var powerupjs = (function (powerupjs) {

    function Animation(sprite, looping, frameTime) {
        this.sprite = sprite;
        this.frameTime = typeof frameTime != 'undefined' ? frameTime : 0.1;
        this.looping = looping;
    }

    powerupjs.Animation = Animation;
    return powerupjs;

})(powerupjs || {});   
