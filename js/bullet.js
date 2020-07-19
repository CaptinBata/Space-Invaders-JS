class Bullet extends GameObject {
    //negative for player by default

    constructor(x, y, alien) {
        super(x, y)
        this.drawPoints = [
            new Vector(-2.5, -15),
            new Vector(2.5, -15),
            new Vector(2.5, 15),
            new Vector(-2.5, 15),
        ]
        this.alien = alien;

        if (this.alien) {
            this.fillColour = "#8b1515"; //red
            this.movementSpeed = 15;
        } else {
            this.fillColour = "#298a51"; //green
            this.movementSpeed = -15;
        }
    }

    update() {
        this.position.y += this.movementSpeed;
    }
}