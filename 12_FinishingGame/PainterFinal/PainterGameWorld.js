"use strict";

function PainterGameWorld() {
    this.cannon = new Cannon();
    this.ball = new Ball();

    this.can1 = new PaintCan(450, Color.red);
    this.can2 = new PaintCan(575, Color.green);
    this.can3 = new PaintCan(700, Color.blue);

    this.score = 0;
    this.lives = 5;
}

PainterGameWorld.prototype.handleInput = function (delta) {
    if (this.lives > 0) {
        this.ball.handleInput(delta);
        this.cannon.handleInput(delta);
    }
    else {
        if (Mouse.leftPressed)
            this.reset();
    }
};

PainterGameWorld.prototype.update = function (delta) {
    if (this.lives > 0) {
        this.ball.update(delta);
        this.cannon.update(delta);
        this.can1.update(delta);
        this.can2.update(delta);
        this.can3.update(delta);
    }
};

PainterGameWorld.prototype.draw = function () {
    Canvas2D.drawImage(sprites.background);
    Canvas2D.drawImage(sprites.scorebar, new Vector2(10, 10));
    Canvas2D.drawText("Score: " + this.score, new Vector2(20, 22), Color.white);

    this.ball.draw();
    this.cannon.draw();
    this.can1.draw();
    this.can2.draw();
    this.can3.draw();
    for (var i = 0; i < this.lives; i++) {
        Canvas2D.drawImage(sprites.lives, new Vector2(i * sprites.lives.width + 15, 60));
    }
    if (this.lives <= 0)
        Canvas2D.drawImage(sprites.gameover,
            new Vector2(Game.size.x - sprites.gameover.width,
                Game.size.y - sprites.gameover.height).divideBy(2));
};

PainterGameWorld.prototype.reset = function () {
    this.score = 0;
    this.lives = 5;
    this.cannon.reset();
    this.ball.reset();
    this.can1.reset();
    this.can2.reset();
    this.can3.reset();
};

PainterGameWorld.prototype.isOutsideWorld = function (position) {
    return position.x < 0 || position.x > Game.size.x || position.y > Game.size.y;
};