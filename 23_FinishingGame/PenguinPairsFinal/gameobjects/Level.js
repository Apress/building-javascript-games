"use strict";

function Level(levelIndex) {
    powerupjs.GameObjectList.call(this);

    var levelData = window.LEVELS[levelIndex];

    this.animals = [];
    this.sharks = [];
    this.levelIndex = levelIndex;
    this.firstMoveMade = false;

    this.add(new powerupjs.SpriteGameObject(sprites.background_level, ID.layer_background));

    this.hintButton = new powerupjs.Button(sprites.button_hint, ID.layer_overlays);
    this.hintButton.position = new powerupjs.Vector2(916, 20);
    this.add(this.hintButton);

    this.retryButton = new powerupjs.Button(sprites.button_retry, ID.layer_overlays);
    this.retryButton.position = new powerupjs.Vector2(916, 20);
    this.retryButton.visible = false;
    this.add(this.retryButton);

    this.quitButton = new powerupjs.Button(sprites.button_quit, ID.layer_overlays);
    this.quitButton.position = new powerupjs.Vector2(1058, 20);
    this.add(this.quitButton);

    var width = levelData.tiles[0].length;
    var height = levelData.tiles.length;

    var playingField = new powerupjs.GameObjectList(ID.layer_objects);
    playingField.position = new powerupjs.Vector2((powerupjs.Game.size.x - width * 73) / 2, 100);
    this.add(playingField);

    var hint = new powerupjs.SpriteGameObject(sprites.arrow_hint, ID.layer_objects_2);
    hint.sheetIndex = levelData.hint_arrow_direction;
    hint.position = new powerupjs.Vector2(levelData.hint_arrow_x * 73, levelData.hint_arrow_y * 72);
    playingField.add(hint);

    this.hintVisible = new VisibilityTimer(hint);
    playingField.add(this.hintVisible);

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
                    var s = new powerupjs.SpriteGameObject(sprites.shark, ID.layer_objects_1);
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
    pairList.position = new powerupjs.Vector2(20, 15);
    this.add(pairList);

    var helpField = new powerupjs.SpriteGameObject(sprites.help, ID.layer_overlays);
    helpField.position = new powerupjs.Vector2(helpField.screenCenterX, 780);
    this.add(helpField);
    var helpLabel = new powerupjs.Label("Arial", "24px", ID.layer_overlays_1);
    helpLabel.text = levelData.hint;
    helpLabel.color = powerupjs.Color.darkBlue;
    helpLabel.position = new powerupjs.Vector2(helpLabel.screenCenterX, 780 + (helpField.height - helpLabel.height) / 2);
    this.add(helpLabel);
}

Level.prototype = Object.create(powerupjs.GameObjectList.prototype);

Object.defineProperty(Level.prototype, "completed",
    {
        get: function () {
            return this.find(ID.pairList).completed;
        }
    });

Level.prototype.handleInput = function (delta) {
    powerupjs.GameObjectList.prototype.handleInput.call(this, delta);
    if (this.hintButton.pressed)
        this.hintVisible.startVisible();
    else if (this.retryButton.pressed)
        this.reset();
    else if (this.quitButton.pressed) {
        powerupjs.GameStateManager.switchTo(ID.game_state_levelselect);
    }
};

Level.prototype.update = function (delta) {
    this.hintButton.visible = GameSettings.hints && !this.firstMoveMade;
    this.retryButton.visible = !this.hintButton.visible;
    powerupjs.GameObjectList.prototype.update.call(this, delta);
};

Level.prototype.reset = function () {
    powerupjs.GameObjectList.prototype.reset.call(this);
    this.firstMoveMade = false;
};

Level.prototype.findAnimalAtPosition = function (pos) {
    for (var i = 0, j = this.animals.length; i < j; ++i)
        if (this.animals[i].currentBlock.equals(pos) && this.animals[i].velocity.isZero)
            return this.animals[i];
    return null;
};

Level.prototype.findSharkAtPosition = function (pos) {
    var tileField = this.find(ID.tiles);
    var sharkPos = new powerupjs.Vector2(pos.x * tileField.cellWidth, pos.y * tileField.cellHeight);
    for (var i = 0, l = this.sharks.length; i < l; ++i)
        if (this.sharks[i].position.equals(sharkPos))
            return this.sharks[i];
    return null;
};