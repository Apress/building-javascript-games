"use strict";

function Player(start, layer, id) {
    powerupjs.AnimatedGameObject.call(this, layer, id);
    this._startPosition = start;
    this._previousYPosition = 0;

    this.onTheGround = false;
    this.alive = true;
    this.walkingOnIce = false;
    this.walkingOnHot = false;
    this.finished = false;
    this.exploded = false;

    this.loadAnimation(sprites.player_idle, "idle", true);
    this.loadAnimation(sprites.player_run, "run", true, 0.05);
    this.loadAnimation(sprites.player_jump, "jump", false, 0.05);
    this.loadAnimation(sprites.player_celebrate, "celebrate", false, 0.05);
    this.loadAnimation(sprites.player_die, "die", false);
    this.loadAnimation(sprites.player_explode, "explode", false, 0.04);

    this.reset();
}

Player.prototype = Object.create(powerupjs.AnimatedGameObject.prototype);

Player.prototype.reset = function () {
    this.playAnimation("idle");

    this._previousYPosition = this.boundingBox.bottom;
    this.position = this._startPosition.copy();
    this.velocity = powerupjs.Vector2.zero;

    this.onTheGround = true;
    this.walkingOnIce = false;
    this.walkingOnHot = false;

    this.origin = new powerupjs.Vector2(this.width / 2, this.height);
};

Player.prototype.handleInput = function (delta) {
    var walkingSpeed = 400;
    if (this.walkingOnIce) {
        walkingSpeed *= 1.5;
        this.velocity.x = Math.sign(this.velocity.x) * walkingSpeed;
    } else if (this.onTheGround)
        this.velocity.x = 0;

    if (powerupjs.Touch.isTouchDevice) {
        // get the buttons
        var walkLeftButton = this.root.find(ID.button_walkleft);
        var walkRightButton = this.root.find(ID.button_walkright);
        if (walkLeftButton.down)
            this.velocity.x = -walkingSpeed;
        else if (walkRightButton.down)
            this.velocity.x = walkingSpeed;
    } else {
        if (powerupjs.Keyboard.down(powerupjs.Keys.left))
            this.velocity.x = -walkingSpeed;
        else if (powerupjs.Keyboard.down(powerupjs.Keys.right))
            this.velocity.x = walkingSpeed;
    }

    if (this.velocity.x != 0)
        this.mirror = this.velocity.x < 0;

    if (powerupjs.Touch.isTouchDevice) {
        var jumpButton = this.root.find(ID.button_jump);
        if (jumpButton.pressed && this.onTheGround)
            this.jump();
    } else {
        if (powerupjs.Keyboard.pressed(powerupjs.Keys.space) && this.onTheGround)
            this.jump();
    }
};

Player.prototype.update = function (delta) {
    powerupjs.AnimatedGameObject.prototype.update.call(this, delta);
    this.doPhysics();
    if (!this.alive || this.finished)
        return;

    if (this.onTheGround)
        if (this.velocity.x == 0)
            this.playAnimation("idle");
        else
            this.playAnimation("run");
    else if (this.velocity.y < 0)
        this.playAnimation("jump");
};

Player.prototype.jump = function (speed) {
    sounds.player_jump.play();
    speed = typeof speed !== 'undefined' ? speed : 1100;
    this.velocity.y = -speed;
};

Player.prototype.doPhysics = function () {
    this.velocity.y += 55;
    this.handleCollisions();
};

Player.prototype.handleCollisions = function () {
    this.onTheGround = false;
    this.walkingOnIce = false;
    this.walkingOnHot = false;

    var tiles = this.root.find(ID.tiles);

    var x_floor = Math.floor(this.position.x / tiles.cellWidth);
    var y_floor = Math.floor(this.position.y / tiles.cellHeight);

    for (var y = y_floor - 2; y <= y_floor + 1; ++y)
        for (var x = x_floor - 1; x <= x_floor + 1; ++x) {
            var tileType = tiles.getTileType(x, y);
            if (tileType === TileType.background)
                continue;
            var tileBounds = new powerupjs.Rectangle(x * tiles.cellWidth, y * tiles.cellHeight,
                tiles.cellWidth, tiles.cellHeight);
            var boundingBox = this.boundingBox;
            boundingBox.height += 1;
            if (!tileBounds.intersects(boundingBox))
                continue;
            var depth = boundingBox.calculateIntersectionDepth(tileBounds);
            if (Math.abs(depth.x) < Math.abs(depth.y)) {
                if (tileType === TileType.normal)
                    this.position.x += depth.x;
                continue;
            }
            if (this._previousYPosition <= tileBounds.top && tileType !== TileType.background) {
                this.onTheGround = true;
                this.velocity.y = 0;
                var currentTile = tiles.at(x, y);
                if (currentTile !== null) {
                    this.walkingOnIce = this.walkingOnIce || currentTile.ice;
                    this.walkingOnHot = this.walkingOnHot || currentTile.hot;
                }
            }
            if (tileType === TileType.normal || this.onTheGround)
                this.position.y += depth.y + 1;
        }
    this._previousYPosition = this.position.y;
};

