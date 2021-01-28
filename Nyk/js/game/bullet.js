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

        if (this.alien) {
            this.drawObject.main.fillColour = "#8b1515"; //red
            this.movementSpeed = 15;
        } else {
            this.drawObject.main.fillColour = "#298a51"; //green
            this.movementSpeed = -15; //negative for player by default
        }
    }

    update() {
        this.position.y += this.movementSpeed;
        if (this.position.y < 0 || this.position.y > window.innerHeight - 25) //if below or above the window
            this.toDelete = true;
    }
}