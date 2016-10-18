"use strict";

var sprites = {};
var sounds = {};

Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return Game.loadSprite("../../assets/Painter/sprites/" + sprite);
    };

    sprites.background = loadSprite("spr_background.jpg");
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
};

Game.initialize = function () {

    Game.gameWorld = new PainterGameWorld();
};

function Vehicle() {
    this.numberOfWheels = 0;
    this.brand = "";
}

Vehicle.prototype.what = function() {
    return "nrOfWheels = " + this.numberOfWheels + ", brand = " + this.brand;
};

function Car(brand) {
    Vehicle.call(this);
    this.numberOfWeels = 4;
    this.brand = brand;
    this.convertible = false;
}
Car.prototype = Object.create(Vehicle.prototype);

function Motorcycle(brand) {
    Vehicle.call(this);
    this.numberOfWheels = 2;
    this.brand = brand;
    this.cylinders = 4;
}
Motorcycle.prototype = Object.create(Vehicle.prototype);