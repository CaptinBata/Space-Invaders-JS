class Bullet extends GameObject {
    constructor(x, y, alien) {
        super(x, y)
        this.setDrawObject({
            "main": {
                "drawPoints": [
                    new Vector(-2.5, -15),
                    new Vector(2.5, -15),
                    new Vector(2.5, 15),
                    new Vector(-2.5, 15),
                ],
                "strokeColour": "#ffffff",
            }
        })
        this.alien = alien;
        this.movementSpeed = 900 / Engine.fps; //15 used for 60fps testing. Want it to scale for everyone at same rate.

        if (this.alien) {
            this.drawObject.main.fillColour = "#8b1515"; //red
        } else {
            this.drawObject.main.fillColour = "#298a51"; //green
            this.movementSpeed = -this.movementSpeed; //negative for player by default
        }
    }

    update(gameObjects) {
        let aliens = gameObjects.filter(gameObject => gameObject instanceof Alien)
        let players = gameObjects.filter(gameObject => gameObject instanceof Player)

        this.movementSpeed = 900 / Engine.fps //15 used for 60fps testing. (15*60=900) Want it to scale for everyone at same rate.
        if (!this.alien)
            this.movementSpeed = -this.movementSpeed;

        this.position.y += this.movementSpeed;
        if (this.position.y < 0 || this.position.y > Engine.getWindowHeight() - 25) //if below or above the window
            this.toDelete = true;

        if (this.alien)
            players.forEach(player => {
                if (player.detectAABBCollision(this)) {
                    player.toDelete = true;
                    this.toDelete = true;
                }
            })
        else
            aliens.forEach(alien => {
                if (alien.detectAABBCollision(this)) {
                    alien.toDelete = true;
                    this.toDelete = true;
                }
            })


    }
}