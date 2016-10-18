"use strict";

function PaintCan(xPosition) {
    this.currentColor = sprites.can_red;
    this.velocity = Vector2.zero;
    this.position = new Vector2(xPosition, -200);
    this.origin = Vector2.zero;
    this.reset();
}

Object.defineProperty(PaintCan.prototype, "color",
    {
        get: function () {
            if (this.currentColor === sprites.can_red)
                return Color.red;
            else if (this.currentColor === sprites.can_green)
                return Color.green;
            else
                return Color.blue;
        },
        set: function (value) {
            if (value === Color.red)
                this.currentColor = sprites.can_red;
            else if (value === Color.green)
                this.currentColor = sprites.can_green;
            else if (value === Color.blue)
                this.currentColor = sprites.can_blue;
        }
    });

Object.defineProperty(PaintCan.prototype, "width",
    {
        get: function () {
            return this.currentColor.width;
        }
    });

Object.defineProperty(PaintCan.prototype, "height",
    {
        get: function () {
            return this.currentColor.height;
        }
    });

Object.defineProperty(PaintCan.prototype, "size",
    {
        get: function () {
            return new Vector2(this.currentColor.width, this.currentColor.height);
        }
    });

Object.defineProperty(PaintCan.prototype, "center",
    {
        get: function () {
            return new Vector2(this.currentColor.width / 2, this.currentColor.height / 2);
        }
    });

PaintCan.prototype.reset = function () {
    this.moveToTop();
    this.minVelocity = 30;
};

PaintCan.prototype.moveToTop = function () {
    this.position.y = -200;
    this.velocity = Vector2.zero;
};

PaintCan.prototype.update = function (delta) {
    this.position.addTo(this.velocity.multiply(delta));

    if (this.velocity.y === 0 && Math.random() < 0.01) {
        this.velocity = this.calculateRandomVelocity();
        this.color = this.calculateRandomColor();
    }

    // calculate the distance between this can and the ball
    var ball = Game.gameWorld.ball;
    var distance = ball.position.add(ball.center).subtractFrom(this.position).subtractFrom(this.center);

    if (Math.abs(distance.x) < this.center.x && Math.abs(distance.y) < this.center.y) {
        this.color = ball.color;
        ball.reset();
    }

    if (Game.gameWorld.isOutsideWorld(this.position))
        this.moveToTop();
    this.minVelocity += 0.01;
};

PaintCan.prototype.draw = function () {
    Canvas2D.drawImage(this.currentColor, this.position, this.rotation, this.origin);
};

PaintCan.prototype.calculateRandomVelocity = function () {
    return new Vector2(0, Math.random() * 30 + this.minVelocity);
};

PaintCan.prototype.calculateRandomColor = function () {
    var randomval = Math.floor(Math.random() * 3);
    if (randomval == 0)
        return Color.red;
    else if (randomval == 1)
        return Color.green;
    else
        return Color.blue;
};