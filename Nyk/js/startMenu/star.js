class Star extends GameObject {
    constructor(type, x, y, rotation, radius) {
        super(x, y)
        this.type = type
        this.canMove = false;
        this.rotation = rotation;
        this.radius = radius;

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

    update(gameObjects) {
        if (this.rotation > 360)
            this.rotation -= 360;
    }
}