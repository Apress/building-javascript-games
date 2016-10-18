"use strict";

function ThreeColorGameObject(sprColorRed, sprColorGreen, sprColorBlue) {
    this.colorRed = sprColorRed;
    this.colorGreen = sprColorGreen;
    this.colorBlue = sprColorBlue;
    this.currentColor = this.colorRed;
    this.velocity = Vector2.zero;
    this.position = Vector2.zero;
    this.origin = Vector2.zero;
    this.rotation = 0;
    this.visible = true;
}

Object.defineProperty(ThreeColorGameObject.prototype, "color",
    {
        get: function () {
            if (this.currentColor === this.colorRed)
                return Color.red;
            else if (this.currentColor === this.colorGreen)
                return Color.green;
            else
                return Color.blue;
        },
        set: function (value) {
            if (value === Color.red)
                this.currentColor = this.colorRed;
            else if (value === Color.green)
                this.currentColor = this.colorGreen;
            else if (value === Color.blue)
                this.currentColor = this.colorBlue;
        }
    });

Object.defineProperty(ThreeColorGameObject.prototype, "width",
    {
        get: function () {
            return this.currentColor.width;
        }
    });

Object.defineProperty(ThreeColorGameObject.prototype, "height",
    {
        get: function () {
            return this.currentColor.height;
        }
    });

Object.defineProperty(ThreeColorGameObject.prototype, "size",
    {
        get: function () {
            return new Vector2(this.currentColor.width, this.currentColor.height);
        }
    });

Object.defineProperty(ThreeColorGameObject.prototype, "center",
    {
        get: function () {
            return new Vector2(this.currentColor.width / 2, this.currentColor.height / 2);
        }
    });

ThreeColorGameObject.prototype.update = function (delta) {
    this.position.addTo(this.velocity.multiply(delta));
};

ThreeColorGameObject.prototype.draw = function () {
    if (!this.visible)
        return;
    Canvas2D.drawImage(this.currentColor, this.position, this.rotation, 1, this.origin);
};