"use strict";

function Level(levelIndex) {
    GameObjectList.call(this);

    var levelData = window.LEVELS[levelIndex];

    this.animals = [];
    this.sharks = [];
    this.levelIndex = levelIndex;
    this.firstMoveMade = false;

    this.add(new SpriteGameObject(sprites.background_level, ID.layer_background));

    this.hintButton = new Button(sprites.button_hint, ID.layer_overlays);
    this.hintButton.position = new Vector2(916, 20);
    this.add(this.hintButton);

    this.retryButton = new Button(sprites.button_retry, ID.layer_overlays);
    this.retryButton.position = new Vector2(916, 20);
    this.retryButton.visible = false;
    this.add(this.retryButton);

    this.quitButton = new Button(sprites.button_quit, ID.layer_overlays);
    this.quitButton.position = new Vector2(1058, 20);
    this.add(this.quitButton);

    var width = levelData.tiles[0].length;
    var height = levelData.tiles.length;

    var playingField = new GameObjectList(ID.layer_objects);
    playingField.position = new Vector2((Game.size.x - width * 73) / 2, 100);
    this.add(playingField);

    var tileField = new TileField(height, width, ID.layer_objects, ID.tiles);
    tileField.cellHeight = 72;
    tileField.cellWidth = 73;
    for (var row = 0; row < height; row++) {
        for (var col = 0; col < width; col++) {
            var t = null;

            switch (levelData.tiles[row][col]) {
                case '.' :
                    t = new Tile(sprites.field, ID.layer_objects);
                    t.sheetIndex = row + col % 2;
                    tileField.addAt(t, col, row);
                    break;
                case ' ':
                    t = new Tile(sprites.wall, ID.layer_objects);
                    t.type = TileType.background;
                    tileField.addAt(t, col, row);
                    break;
                case 'r':
                case 'b':
                case 'g':
                case 'o':
                case 'p':
                case 'y':
                case 'm':
                case 'x':
                case 'R':
                case 'B':
                case 'G':
                case 'O':
                case 'P':
                case 'Y':
                case 'M':
                case 'X':
                    t = new Tile(sprites.field, ID.layer_objects);
                    t.sheetIndex = row + col % 2;
                    tileField.addAt(t, col, row);
                    var animalSprite = sprites.penguin;
                    if (levelData.tiles[row][col] === levelData.tiles[row][col].toUpperCase())
                        animalSprite = sprites.penguin_boxed;
                    var p = new Animal(levelData.tiles[row][col], animalSprite, ID.layer_objects_1);
                    p.position = t.position.copy();
                    p.initialPosition = t.position.copy();
                    playingField.add(p);
                    this.animals.push(p);
                    break;
                case '@':
                    t = new Tile(sprites.field);
                    t.sheetIndex = row + col % 2;
                    tileField.addAt(t, col, row);
                    var s = new SpriteGameObject(sprites.shark, ID.layer_objects_1);
                    s.position = t.position.copy();
                    playingField.add(s);
                    this.sharks.push(s);
                    break;
                default  :
                    t = new Tile(sprites.wall, ID.layer_objects);
                    tileField.addAt(t, col, row);
                    t.type = TileType.wall;
                    break;
            }
        }
    }
    playingField.add(tileField);

    playingField.add(new AnimalSelector(ID.layer_objects_2, ID.animalSelector));

    var pairList = new PairList(levelData.nrPairs, ID.layer_overlays, ID.pairList);
    pairList.position = new Vector2(20, 15);
    this.add(pairList);

    var helpField = new SpriteGameObject(sprites.help, ID.layer_overlays);
    helpField.position = new Vector2(helpField.screenCenterX, 780);
    this.add(helpField);
    var helpLabel = new Label("Arial", "24px", ID.layer_overlays_1);
    helpLabel.text = levelData.hint;
    helpLabel.color = Color.darkBlue;
    helpLabel.position = new Vector2(helpLabel.screenCenterX, 780 + (helpField.height - helpLabel.height) / 2);
    this.add(helpLabel);
}

Level.prototype = Object.create(GameObjectList.prototype);

Level.prototype.handleInput = function (delta) {
    GameObjectList.prototype.handleInput.call(this, delta);
    if (this.retryButton.pressed)
        this.reset();
    else if (this.quitButton.pressed) {
        GameStateManager.switchTo(ID.game_state_levelselect);
    }
};

Level.prototype.findAnimalAtPosition = function (pos) {
    for (var i = 0, j = this.animals.length; i < j; ++i)
        if (this.animals[i].currentBlock.equals(pos) && this.animals[i].velocity.isZero)
            return this.animals[i];
    return null;
};

Level.prototype.findSharkAtPosition = function (pos) {
    var tileField = this.find(ID.tiles);
    var sharkPos = new Vector2(pos.x * tileField.cellWidth, pos.y * tileField.cellHeight);
    for (var i = 0, l = this.sharks.length; i < l; ++i)
        if (this.sharks[i].position.equals(sharkPos))
            return this.sharks[i];
    return null;
};