class Shield extends GameObject {
    constructor(x, y) {
        super(x, y)
        this.drawPoints = this.getShape();
        this.fillColour = "#298a51" //green
    }

    getShape() {
        let shapePoints = [];
        for (let i = 0; i < 11; i++) {
            for (let i2 = -20 - i; i2 < 20 + i; i2++) {
                shapePoints.push(new Vector(i2, -30 + i));
            }
        }

        for (let x = -30; x < 31; x++) {
            for (let y = -19; y < 1; y++) {
                shapePoints.push(new Vector(x, y))
            }
        }

        return shapePoints;
    }

    update() {
        let random = Utilities.getRandomInt(0, this.drawPoints.length)
        this.drawPoints.splice(random, 1); //remove the element at index random, and only that item
    }

    draw(context) {
        this.drawByPixel(context);
    }
}