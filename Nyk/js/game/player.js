class Player extends BulletGameObject {
    constructor(x, y) {
        super(x, y)
        this.setDrawObject({
            "main": {
                "drawPoints": [
                    new Vector(-30, 15),
                    new Vector(-30, -15),
                    new Vector(-2.5, -15),
                    new Vector(-2.5, -25),
                    new Vector(2.5, -25),
                    new Vector(2.5, -15),
                    new Vector(30, -15),
                    new Vector(30, 15),
                    new Vector(-30, 15),
                ],
                "fillColour": "#ffffff",
                "strokeColour": "#ffffff",
            }
        })

    }

    checkDelete(gameObjects) {
        this.checkDeleteBullets();
    }

    update(gameObjects) {
        Engine.keys.forEach(key => {
            switch (key) {
                case "a":
                    this.position.x -= 15;
                    if (Engine.playableArea.min.x > this.position.x)
                        this.position.x = Engine.playableArea.min.x;
                    Utilities.removeElement(Engine.keys, key); //delete the key from the list, so other things can't use it's value. Stops two things from using one press
                    break;
                case "d":
                    this.position.x += 15;
                    if (Engine.playableArea.max.x < this.position.x)
                        this.position.x = Engine.playableArea.max.x;
                    Utilities.removeElement(Engine.keys, key); //delete the key from the list, so other things can't use it's value. Stops two things from using one press
                    break;
                case " ":
                    if (this.bullets.length < 3)
                        this.spawnBullet(this.position.x, this.position.y, false)
                    Utilities.removeElement(Engine.keys, key); //delete the key from the list, so other things can't use it's value. Stops two things from using one press
                    break;
            }
        });

        this.updateBullets(gameObjects);
    }

    draw() {
        this.drawBullets();
        this.drawByLine();
    }
}