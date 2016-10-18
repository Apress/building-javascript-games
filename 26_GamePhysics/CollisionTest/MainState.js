"use strict";

function MainState(layer) {
    powerupjs.GameObjectList.call(this, layer);

    this.player = new Player();
    this.player.position = new powerupjs.Vector2(50, 300);
    this.add(this.player);

    this.sparky = new Sparky();
    this.sparky.position = new powerupjs.Vector2(150, 200);
    this.add(this.sparky);
}

MainState.prototype = Object.create(powerupjs.GameObjectList.prototype);

MainState.prototype.draw = function () {
    powerupjs.GameObjectList.prototype.draw.call(this);
    // draw the bounding boxes
    this.player.boundingBox.draw();
    this.sparky.boundingBox.draw();
    if (this.player.collidesWith(this.sparky))
        powerupjs.Canvas2D.drawText("Collision");
};