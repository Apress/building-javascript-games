"use strict";

function calculateTextSize(fontname, fontsize, text) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = -1000;
    div.style.top = -1000;
    document.body.appendChild(div);
    text = typeof text !== 'undefined' ? text : "M";
    div.style.fontSize = "" + fontsize;
    div.style.fontFamily = fontname;
    div.innerHTML = text;
    var size = new Vector2(div.offsetWidth, div.offsetHeight);
    document.body.removeChild(div);
    return size;
}

function Label(fontname, fontsize, layer, id) {
    GameObject.call(this, layer, id);

    this.color = Color.black;
    this.origin = Vector2.zero;
    this._fontname = typeof fontname !== 'undefined' ? fontname : "Courier New";
    this._fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";
    this._contents = "";
    this._align = "left";
    this._size = Vector2.zero;
}

Label.prototype = Object.create(GameObject.prototype);

Object.defineProperty(Label.prototype, "size",
    {
        get: function () {
            return this._size;
        }
    });

Object.defineProperty(Label.prototype, "width",
    {
        get: function () {
            return this._size.x;
        }
    });

Object.defineProperty(Label.prototype, "height",
    {
        get: function () {
            return this._size.y;
        }
    });

Object.defineProperty(Label.prototype, "screenCenterX",
    {
        get: function () {
            return (Game.size.x - this.width) / 2 + this.origin.x;
        }
    });

Object.defineProperty(Label.prototype, "screenCenterY",
    {
        get: function () {
            return (Game.size.y - this.height) / 2 + this.origin.y;
        }
    });

Object.defineProperty(Label.prototype, "screenCenter",
    {
        get: function () {
            return Game.size.subtract(this.size).divideBy(2).addTo(this.origin);
        }
    });

Object.defineProperty(Label.prototype, "text",
    {
        get: function () {
            return this._contents;
        },

        set: function (value) {
            this._contents = value;
            this._size = calculateTextSize(this._fontname, this._fontsize, value);
        }
    });

Label.prototype.draw = function () {
    if (!this.visible)
        return;
    Canvas2D.drawText(this._contents, this.worldPosition,
        this.origin, this.color, this._align,
        this._fontname, this._fontsize);
};
