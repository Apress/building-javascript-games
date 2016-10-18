"use strict";

function AnimationState(layer) {
    powerupjs.GameObjectList.call(this, layer);

    var player = new Player();
    player.position = new powerupjs.Vector2(50, 300);
    this.add(player);
}

AnimationState.prototype = Object.create(powerupjs.GameObjectList.prototype);
