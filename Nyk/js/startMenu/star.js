class Star extends GameObject {
    constructor(type, x, y, rotation, radius) {
        super(x, y)

        this.type = type
        this.canMove = false;
        this.rotation = rotation;
        this.radius = radius;
        this.direction = undefined;

        this.setDrawObject({
            "main": {
                "drawPoints": [
                    new Vector(0, 0),
                    new Vector(-2, 2),
                    new Vector(0, 0),
                    new Vector(0, 2),
                    new Vector(0, 0),
                    new Vector(2, 2),
                    new Vector(0, 0),
                    new Vector(2, -2),
                    new Vector(0, 0),
                    new Vector(0, -2),
                    new Vector(0, 0),
                    new Vector(-2, -2),
                ],
                "fillColour": "#ffffff",
                "strokeColour": "#ffffff",
            }
        })
    }

    setMove(value) {
        this.canMove = value;
    }

    update(gameObjects) {
        if (this.rotation > 360)
            this.rotation -= 360;
        if (this.canMove) {
            this.position = new Vector(
                this.position.x + this.direction.x,
                this.position.y + this.direction.y
            )
            if (this.position.x > Engine.getWindowWidth())
                this.position.x = 0;
            if (this.position.x < 0)
                this.position.x = Engine.getWindowWidth();

            if (this.position.y > Engine.getWindowHeight())
                this.position.y = 0;
            if (this.position.y < 0)
                this.position.y = Engine.getWindowHeight();
        }
    }
}