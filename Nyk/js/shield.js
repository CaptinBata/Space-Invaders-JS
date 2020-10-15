class Shield extends GameObject {
    constructor(x, y) {
        super(x, y)
        this.setDrawPoints({
            "main":
                { "drawPoints": this.getShape() }
        });
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

    checkCollisions(bullet) {
        if (this.detectAABBCollision(bullet)) {
            let overlappingPixels = this.drawObject.main.drawPoints.filter(pixel =>
                this.position.x + pixel.x > bullet.position.x + bullet.getMinMax().min.x
                && this.position.x + pixel.x < bullet.position.x + bullet.getMinMax().max.x
                && this.position.y + pixel.y > bullet.position.y + bullet.getMinMax().min.y
                && this.position.y + pixel.y < bullet.position.y + bullet.getMinMax().max.y);

            overlappingPixels.forEach(pixel => {
                Utilities.removeElement(this.drawObject.main.drawPoints, pixel)
                bullet.toDelete = true;
            })
        }

    }

    checkDelete() {
        if (this.drawObject.main.drawPoints.length == 0)
            this.toDelete = true;
    }

    update(bullet) {
        this.checkCollisions(bullet);

    }

    draw(context) {
        this.drawByPixel(context);
    }
}