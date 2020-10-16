class Alien extends GameObject {
    bullets = [];
    constructor(x, y) {
        super(x, y)
        this.setDrawObject({
            "main": {
                "drawPoints": [
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
                ],
                "fillColour": "#ffffff",
            }
        })

    }
}