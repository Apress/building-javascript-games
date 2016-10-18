"use strict";

function JewelJamGameWorld(layer) {
    GameObjectList.call(this, layer);

    this.add(new SpriteGameObject(sprites.background, ID.layer_background));

    var rows = 10, columns = 5;
    var grid = new JewelGrid(rows, columns, ID.layer_objects);
    grid.position = new Vector2(85, 150);
    grid.cellWidth = 85;
    grid.cellHeight = 85;
    this.add(grid);
    for (var i = 0; i < rows * columns; i++) {
        grid.add(new Jewel());
    }
}

JewelJamGameWorld.prototype = Object.create(GameObjectList.prototype);