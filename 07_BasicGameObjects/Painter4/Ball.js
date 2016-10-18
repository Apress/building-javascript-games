"use strict";

var ball = {
};

ball.initialize = function() {
    ball.position = { x : 0, y : 0 };
    ball.velocity =  { x : 0, y : 0 };
    ball.origin = { x : 0, y : 0 };
    ball.currentColor = sprites.ball_red;
    ball.shooting = false;
};

ball.handleInput = function (delta) {
    if (Mouse.leftPressed && !ball.shooting) {
        ball.shooting = true;
        ball.velocity.x = (Mouse.position.x - ball.position.x) * 1.2;
        ball.velocity.y = (Mouse.position.y - ball.position.y) * 1.2;
    }
};

ball.update = function (delta) {
    if (ball.shooting) {
        ball.velocity.x *= 0.99;
        ball.velocity.y += 6;
        ball.position.x += ball.velocity.x * delta;
        ball.position.y += ball.velocity.y * delta;
    }
    else {
        if (cannon.currentColor === sprites.cannon_red)
            ball.currentColor = sprites.ball_red;
        else if (cannon.currentColor === sprites.cannon_green)
            ball.currentColor = sprites.ball_green;
        else
            ball.currentColor = sprites.ball_blue;
        ball.position = cannon.ballPosition();
        ball.position.x -= ball.currentColor.width / 2;
        ball.position.y -= ball.currentColor.height / 2;
    }
    if (painterGameWorld.isOutsideWorld(ball.position))
        ball.reset();
};

ball.reset = function () {
    ball.position = { x : 0, y : 0 };
    ball.shooting = false;
};

ball.draw = function () {
    if (!ball.shooting)
        return;
    Canvas2D.drawImage(ball.currentColor, ball.position, 0, ball.origin);
};