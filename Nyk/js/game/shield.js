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

    checkCollisions(object) {
        if (this.detectAABBCollision(object)) {
            let bulletMinGlobal = object.toGlobalCoords(object.getMinMax().min)
            let bulletMaxGlobal = object.toGlobalCoords(object.getMinMax().max)

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
                if (object instanceof Bullet) //Only delete other object, if it's a bullet
                    object.toDelete = true;
            })
        }

    }

    checkDelete(gameObjects) {
        if (this.drawObject.main.drawPoints.length == 0)
            this.toDelete = true;
    }

    update(gameObjects) {
        let player = gameObjects.filter(gameObject => gameObject instanceof Player)
        let aliens = gameObjects.filter(gameObject => gameObject instanceof Alien)

        player[0].getBullets().forEach(bullet => {
            this.checkCollisions(bullet);
        })

        aliens.forEach(alien => {
            this.checkCollisions(alien)

            alien.getBullets().forEach(bullet => {
                this.checkCollisions(bullet);
            })
        })
    }

    draw() {
        this.drawByPixel();
    }
}