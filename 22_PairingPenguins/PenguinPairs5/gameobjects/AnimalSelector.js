"use strict";

function AnimalSelector(layer, id) {
    GameObjectList.call(this, layer, id);
    this._arrowright = new Arrow(0);
    this._arrowright.position = new Vector2(this._arrowright.width, 0);
    this.add(this._arrowright);
    this._arrowup = new Arrow(1);
    this._arrowup.position = new Vector2(0, -this._arrowright.height);
    this.add(this._arrowup);
    this._arrowleft = new Arrow(2);
    this._arrowleft.position = new Vector2(-this._arrowright.width, 0);
    this.add(this._arrowleft);
    this._arrowdown = new Arrow(3);
    this._arrowdown.position = new Vector2(0, this._arrowright.height);
    this.add(this._arrowdown);
    this.selectedAnimal = null;
    this.visible = false;
}

AnimalSelector.prototype = Object.create(GameObjectList.prototype);

AnimalSelector.prototype.handleInput = function (delta) {
    if (!this.visible)
        return;
    GameObjectList.prototype.handleInput.call(this, delta);

    var animalVelocity = Vector2.zero;
    if (this._arrowdown.pressed)
        animalVelocity.y = 1;
    else if (this._arrowup.pressed)
        animalVelocity.y = -1;
    else if (this._arrowleft.pressed)
        animalVelocity.x = -1;
    else if (this._arrowright.pressed)
        animalVelocity.x = 1;
    animalVelocity.multiplyWith(300);
    if (Mouse.left.pressed || Touch.containsTouchPress(Game.screenRect))
        this.visible = false;

    if (this.selectedAnimal === null || animalVelocity.isZero)
        return;
    this.selectedAnimal.velocity = animalVelocity;
};