"use strict";

function PainterGameWorld() {
    this.cannon = new Cannon();
    this.ball = new Ball();

    this.can1 = new PaintCan(450);
    this.can2 = new PaintCan(575);
    this.can3 = new PaintCan(700);
}

PainterGameWorld.prototype.handleInput = function (delta) {
    this.ball.handleInput(delta);
    this.cannon.handleInput(delta);
};

PainterGameWorld.prototype.update = function (delta) {
    this.ball.update(delta);
    this.cannon.update(delta);
    this.can1.update(delta);
    this.can2.update(delta);
    this.can3.update(delta);
};

PainterGameWorld.prototype.draw = function () {
    Canvas2D.drawImage(sprites.background);

    this.ball.draw();
    this.cannon.draw();
    this.can1.draw();
    this.can2.draw();
    this.can3.draw();
};

PainterGameWorld.prototype.reset = function () {
    this.ball.reset();
    this.cannon.reset();
    this.can1.reset();
    this.can2.reset();
    this.can3.reset();
};

PainterGameWorld.prototype.isOutsideWorld = function (position) {
    return position.x < 0 || position.x > Game.size.x || position.y > Game.size.y;
};