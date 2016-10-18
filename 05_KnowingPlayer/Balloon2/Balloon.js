"use strict";

function handleMouseMove(evt) {
    Game.mousePosition = { x : evt.pageX, y : evt.pageY };
}

var Game = {
    canvas : undefined,
    canvasContext : undefined,
    backgroundSprite : undefined,
    balloonSprite : undefined,
    mousePosition : { x : 0, y : 0 },
    balloonOrigin : { x : 0, y : 0 }
};

Game.clearCanvas = function () {
    Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
};

Game.drawImage = function (sprite, position, origin) {
    Game.canvasContext.save();
    Game.canvasContext.translate(position.x, position.y);
    Game.canvasContext.drawImage(sprite, 0, 0, sprite.width, sprite.height,
        -origin.x, -origin.y, sprite.width, sprite.height);
    Game.canvasContext.restore();
};

Game.start = function () {
    Game.canvas = document.getElementById("myCanvas");
    Game.canvasContext = Game.canvas.getContext('2d');
    document.onmousemove = handleMouseMove;
    Game.backgroundSprite = new Image();
    Game.backgroundSprite.src = "spr_background.jpg";
    Game.balloonSprite = new Image();
    Game.balloonSprite.src = "spr_balloon.png";
    window.setTimeout(Game.mainLoop, 500);
};

document.addEventListener( 'DOMContentLoaded', Game.start);

Game.mainLoop = function() {
    Game.clearCanvas();
    Game.update();
    Game.draw();
    window.setTimeout(Game.mainLoop, 1000 / 60);
};

Game.update = function () {
};

Game.draw = function () {
    Game.drawImage(Game.backgroundSprite, { x : 0, y : 0 }, { x : 0, y : 0 });
    Game.balloonOrigin = { x : Game.balloonSprite.width / 2, y : Game.balloonSprite.height };
    Game.drawImage(Game.balloonSprite, Game.mousePosition, Game.balloonOrigin);
};