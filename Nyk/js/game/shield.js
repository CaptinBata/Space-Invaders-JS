class Shield extends GameObject {
    constructor(x, y) {
        super(x, y)
        this.setDrawObject({
            "main":
            {
                "drawPoints": this.getShape(),
                "fillColour": "#298a51", //green
                "strokeColour": "",
            }
        });

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
            let bulletMinGlobal = bullet.toGlobalCoords(bullet.getMinMax().min)
            let bulletMaxGlobal = bullet.toGlobalCoords(bullet.getMinMax().max)

            let overlappingPixels = this.drawObject.main.drawPoints.filter(pixel => {
                let pixelGlobal = this.toGlobalCoords(pixel);

                if (pixelGlobal.x > bulletMinGlobal.x
                    && pixelGlobal.x < bulletMaxGlobal.x
                    && pixelGlobal.y > bulletMinGlobal.y
                    && pixelGlobal.y < bulletMaxGlobal.y)
                    return pixel
            });

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