class Player extends GameObject {
    constructor(x, y) {
        super(x, y, [
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
}