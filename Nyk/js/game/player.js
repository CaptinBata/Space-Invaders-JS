class Player extends GameObject {
    bullets = [];
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

    getBullets() {
        return this.bullets;
    }

    checkDelete() {
        this.bullets.forEach(bullet => {
            if (bullet.toDelete)
                Utilities.removeElement(this.bullets, bullet)
        });

        //Add in collision of alien bullets here
    }

    update(keys) {
        keys.forEach(key => {
            switch (key) {
                case "a":
                    this.position.x -= 15;
                    Utilities.removeElement(keys, key); //delete the key from the list, so other things can't use it's value. Stops two things from using one press
                    break;
                case "d":
                    this.position.x += 15;
                    Utilities.removeElement(keys, key); //delete the key from the list, so other things can't use it's value. Stops two things from using one press
                    break;
                case " ":
                    if (this.bullets.length < 3)
                        this.bullets.push(new Bullet(this.position.x, this.position.y, false))
                    Utilities.removeElement(keys, key); //delete the key from the list, so other things can't use it's value. Stops two things from using one press
                    break;
            }
        });

        this.bullets.forEach(bullet => {
            bullet.update();
            if (bullet.toDelete)
                Utilities.removeElement(this.bullets, bullet);
        })
    }

    draw(context) {
        this.bullets.forEach(bullet => { // Bullets draw first so we can hide it spawning behind the player. This make it look like it comes out of the gun
            bullet.draw(context)
        })
        this.drawByLine(context);
    }
}