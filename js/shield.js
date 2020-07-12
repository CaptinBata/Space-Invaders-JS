class Shield extends GameObject {
    constructor(x, y) {
        super(x, y, [
            new Vector(2.5, 0),
            new Vector(30, 0),
            new Vector(30, -20),
            new Vector(20, -30),
            new Vector(-20, -30),
            new Vector(-30, -20),
            new Vector(-30, 0),
            new Vector(-2.5, 0),
        ])
        this.fillColour = "#298a51" //green
    }
}