var canvas = undefined;
var canvasContext = undefined;

function start () {
    canvas = document.getElementById("myCanvas");
    canvasContext = canvas.getContext("2d");
    gameLoop();
}

document.addEventListener( 'DOMContentLoaded', start);

function update () {
}

function draw () {
}

function gameLoop () {
    canvasContext.fillStyle = "blue";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    window.setTimeout(gameLoop, 1000 / 60);
}