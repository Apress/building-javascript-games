"use strict";

function JewelJamGameWorld(layer, id) {
    GameObjectList.call(this, layer, id);

    // the title screen
    var titleScreen = new SpriteGameObject(sprites.title, ID.layer_overlays_2, ID.title);
    this.add(titleScreen);

    // add a background sprite
    var background = new SpriteGameObject(sprites.background, ID.layer_background);
    this.add(background);

    // add a score frame
    var scoreFrame = new SpriteGameObject(sprites.frame_score, ID.layer_overlays);
    scoreFrame.position = new Vector2(20, 20);
    this.add(scoreFrame);

    var score = new ScoreGameObject("Segoe UI Mono", "40px", ID.layer_overlays_1, ID.score);
    score.position = new Vector2(270, 35);
    score.color = Color.white;

    this.add(score);

    this.helpButton = new Button(sprites.button_help, ID.layer_overlays);
    this.helpButton.position = new Vector2(1268, 20);
    this.add(this.helpButton);

    var helpFrame = new SpriteGameObject(sprites.frame_help, ID.layer_overlays, ID.help_frame);
    helpFrame.position = new Vector2(636, 120);
    helpFrame.visible = false;
    this.add(helpFrame);

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

    // game over overlay
    var gameOver = new SpriteGameObject(sprites.gameover, ID.layer_overlays_1, ID.game_over);
    gameOver.visible = false;
    gameOver.position = gameOver.screenCenter;
    this.add(gameOver);
}

JewelJamGameWorld.prototype = Object.create(GameObjectList.prototype);

JewelJamGameWorld.prototype.handleInput = function (delta) {
    // title screen
    var titleScreen = this.root.find(ID.title);
    if (titleScreen.visible) {
        if (Mouse.left.pressed || Touch.isPressing)
            titleScreen.visible = false;
        return;
    }

    // game over
    if (this.gameOver()) {
        if (Mouse.left.pressed || Touch.isPressing)
            this.reset();
        return;
    }

    // playing
    GameObjectList.prototype.handleInput.call(this, delta);
    var helpFrame = this.root.find(ID.help_frame);
    if (this.helpButton.pressed || (helpFrame.visible && (Mouse.left.pressed || Touch.isPressing))) {
        helpFrame.visible = !helpFrame.visible;
    }
};

JewelJamGameWorld.prototype.update = function (delta) {
    // title screen
    var titleScreen = this.root.find(ID.title);
    if (titleScreen.visible)
        return;

    // game over
    var gameOver = this.root.find(ID.game_over);
    if (this.gameOver()) {
        gameOver.visible = true;
    }

    // playing
    var helpFrame = this.root.find(ID.help_frame);
    var grid = this.root.find(ID.grid);
    grid.visible = !helpFrame.visible;
    if (!helpFrame.visible)
        GameObjectList.prototype.update.call(this, delta);
};

JewelJamGameWorld.prototype.gameOver = function () {
    var jewelCart = this.root.find(ID.jewel_cart);
    return jewelCart.position.x > Game.size.x;
};

JewelJamGameWorld.prototype.reset = function () {
    GameObjectList.prototype.reset.call(this);
    var gameOver = this.root.find(ID.game_over);
    gameOver.visible = false;
    var titleScreen = this.root.find(ID.title);
    titleScreen.visible = false;
    var helpFrame = this.root.find(ID.help_frame);
    helpFrame.visible = false;
};