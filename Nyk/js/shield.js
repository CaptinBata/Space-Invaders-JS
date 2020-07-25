class Shield extends GameObject {
    constructor(x, y) {
        super(x, y)
        this.setDrawPoints(this.getShape());
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
        let collisions = this.detectCollision(bullet)

        if (collisions.Left && collisions.Right && collisions.Top && collisions.Bottom)
            this.checkOverlappingPixels(bullet, this.drawPoints);
        else if (collisions.Left && collisions.Top && collisions.Bottom)
            this.checkOverlappingPixels(bullet, this.drawPoints.filter(point => this.position.x + point.x < bullet.position.x + bullet.getMinMax().max.x))
        else if (collisions.Right && collisions.Top && collisions.Bottom)
            this.checkOverlappingPixels(bullet, this.drawPoints.filter(point => this.position.x + point.x > bullet.position.x + bullet.getMinMax().min.x))
        else if (collisions.Left && collisions.Top)
            this.checkOverlappingPixels(bullet, this.drawPoints.filter(point => this.position.x + point.x < bullet.position.x + bullet.getMinMax().max.x
                && this.position.y + point.y > bullet.position.y + bullet.getMinMax().min.y))
        else if (collisions.Left && collisions.Bottom)
            this.checkOverlappingPixels(bullet, this.drawPoints.filter(point => this.position.x + point.x < bullet.position.x + bullet.getMinMax().max.x
                && this.position.y + point.y < bullet.position.y + bullet.getMinMax().max.y))
        else if (collisions.Right && collisions.Top)
            this.checkOverlappingPixels(bullet, this.drawPoints.filter(point => this.position.x + point.x > bullet.position.x + bullet.getMinMax().min.x
                && this.position.y + point.y > bullet.position.y + bullet.getMinMax().min.y))
        else if (collisions.Right && collisions.Bottom)
            this.checkOverlappingPixels(bullet, this.drawPoints.filter(point => this.position.x + point.x > bullet.position.x + bullet.getMinMax().min.x
                && this.position.y + point.y < bullet.position.y + bullet.getMinMax().max.y))
    }

    update(bullet) {
        this.checkCollisions(bullet);
    }

    checkOverlappingPixels(object, pixels) {
        console.log("It Ran!");
        console.log(pixels);
    }

    draw(context) {
        this.drawByPixel(context);
    }
}