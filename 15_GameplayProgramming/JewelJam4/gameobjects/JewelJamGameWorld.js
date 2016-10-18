"use strict";

function JewelJamGameWorld(layer, id) {
    GameObjectList.call(this, layer, id);

    // add a background sprite
    this.add(new SpriteGameObject(sprites.background, ID.layer_background));

    // add a score frame
    var scoreFrame = new SpriteGameObject(sprites.frame_score, ID.layer_overlays);
    scoreFrame.position = new Vector2(20, 20);
    this.add(scoreFrame);

    var score = new ScoreGameObject("Segoe UI Mono", "40px", ID.layer_overlays_1, ID.score);
    score.position = new Vector2(270, 35);
    score.color = Color.white;

    this.add(score);

    var jewelCart = new JewelCart(sprites.jewelcart, ID.layer_objects, ID.jewel_cart);
    jewelCart.position = new Vector2(410, 230);
    jewelCart.minxpos = 410;
    this.add(jewelCart);

    // add the grid
    var rows = 10, columns = 5;
    var grid = new JewelGrid(rows, columns, ID.layer_objects, ID.grid);
    grid.position = new Vector2(85, 150);
    grid.cellWidth = 85;
    grid.cellHeight = 85;
    grid.reset();
    this.add(grid);
}

JewelJamGameWorld.prototype = Object.create(GameObjectList.prototype);