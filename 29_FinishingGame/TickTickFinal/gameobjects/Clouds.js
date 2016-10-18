"use strict";

function Clouds(layer, id) {
    powerupjs.GameObjectList.call(this, layer, id);
    for (var i = 0; i < 3; i++) {
        var cloud = new powerupjs.SpriteGameObject(sprites["cloud_" + Math.ceil(Math.random()*5)]);
        cloud.position = new powerupjs.Vector2(Math.random() * powerupjs.Game.size.x - cloud.width / 2,
                Math.random() * powerupjs.Game.size.y - cloud.height / 2);
        cloud.velocity = new powerupjs.Vector2((Math.random() * 2 - 1) * 20, 0);
        this.add(cloud);
    }
}

Clouds.prototype = Object.create(powerupjs.GameObjectList.prototype);

Clouds.prototype.update = function (delta) {
    powerupjs.GameObjectList.prototype.update.call(this, delta);

    for (var i = 0, l = this.length; i < l; ++i) {
        var c = this.at(i);
        if ((c.velocity.x < 0 && c.position.x + c.width < 0) || (c.velocity.x > 0 && c.position.x > powerupjs.Game.size.x)) {
            this.remove(c);
            var cloud = new powerupjs.SpriteGameObject(sprites["cloud_" + Math.ceil(Math.random()*5)]);
            cloud.velocity = new powerupjs.Vector2(((Math.random() * 2) - 1) * 20, 0);
            var cloudHeight = Math.random() * powerupjs.Game.size.y - cloud.height / 2;
            if (cloud.velocity.x < 0)
                cloud.position = new powerupjs.Vector2(powerupjs.Game.size.x, cloudHeight);
            else
                cloud.position = new powerupjs.Vector2(-cloud.width, cloudHeight);
            this.add(cloud);
            return;
        }
    }
};