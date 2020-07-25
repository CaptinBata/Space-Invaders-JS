class Player extends GameObject {
    bullets = [];
    constructor(x, y) {
        super(x, y)
        this.setDrawPoints([
            new Vector(2.5, 0),
            new Vector(30, 0),
            new Vector(30, -30),
            new Vector(2.5, -30),
            new Vector(2.5, -40),
            new Vector(-2.5, -40),
            new Vector(-2.5, -30),
            new Vector(-30, -30),
            new Vector(-30, 0),
            new Vector(-2.5, 0),
        ])

    }

    update(keys) {
        keys.forEach(key => {
            switch (key) {
                case "a":
                    this.position.x -= 30;
                    keys.splice(keys.indexOf(key), 1); //delete the key from the list, so other things can't use it's value. Stops two things from using one press
                    break;
                case "d":
                    this.position.x += 30;
                    keys.splice(keys.indexOf(key), 1); //delete the key from the list, so other things can't use it's value. Stops two things from using one press
                    break;
                case " ":
                    if (this.bullets.length < 3)
                        this.bullets.push(new Bullet(this.position.x, this.position.y, false))
            }
        });
        this.bullets.forEach(bullet => {
            bullet.update();
            if (bullet.position.y < 0 || bullet.position.y > window.innerHeight - 25) //if below or above the window
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
        })
    }

    draw(context) {
        this.bullets.forEach(bullet => { // Bullets draw first so we can hide it spawning behind the player. This make it look like it comes out of the gun
            bullet.draw(context)
        })
        this.drawByLine(context);
    }
}