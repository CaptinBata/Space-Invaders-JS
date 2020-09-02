class GameObject {
    drawObject = {};
    position = null;
    fillColour = "#ffffff"
    minMax = {};
    toDelete = false;

    constructor(x, y) {
        this.position = new Vector(x, y);
    }

    setDrawPoints(points) {
        this.drawObject = points;
        this.getObjectBounds();
    }

    getMinMax() {
        return this.drawObject.main.minMax;
    }

    detectAABBCollision(other) {
        let collisions = {
            minX: false, maxX: false, minY: false, maxY: false
        }

        if (other.position.x + other.getMinMax().min.x > this.position.x + this.getMinMax().min.x
            && other.position.x + other.getMinMax().min.x < this.position.x + this.getMinMax().max.x)
            collisions.minX = true;
        if (other.position.x + other.getMinMax().max.x > this.position.x + this.getMinMax().min.x
            && other.position.x + other.getMinMax().max.x < this.position.x + this.getMinMax().max.x)
            collisions.maxX = true;


        if (other.position.y + other.getMinMax().min.y > this.position.y + this.getMinMax().min.y
            && other.position.y + other.getMinMax().min.y < this.position.y + this.getMinMax().max.y)
            collisions.minY = true;
        if (other.position.y + other.getMinMax().max.y > this.position.y + this.getMinMax().min.y
            && other.position.y + other.getMinMax().max.y < this.position.y + this.getMinMax().max.y)
            collisions.maxY = true;

        return (collisions.minX || collisions.maxX) && (collisions.minY || collisions.maxY); //If horizontal point and vertical point overlapping, doesn't matter which ones or if multiple of either
    }

    getObjectBounds() { //Used to find the AABB (Axis-Aligned Bounding Box). Basically the basic box around the object to be used as primitive hit detection
        Object.values(this.drawObject).forEach(obj => {
            let min = new Vector(1000000, 1000000);
            let max = new Vector(-1000000, -1000000);

            obj.drawPoints.forEach(point => {
                if (point.x < min.x)
                    min = new Vector(point.x, min.y)
                if (point.y < min.y)
                    min = new Vector(min.x, point.y)

                if (point.x > max.x)
                    max = new Vector(point.x, max.y)
                if (point.y > max.y)
                    max = new Vector(max.x, point.y)
            });

            let minMax = {
                min: min,
                max: max
            }

            obj.minMax = minMax;
        })
    }

    draw(context) {
        this.drawByLine(context);
    }

    drawByLine(context) {
        Object.values(this.drawObject).forEach(obj => {
            context.beginPath();
            context.moveTo(this.position.x + obj.drawPoints[0].x, this.position.y + obj.drawPoints[0].y);
            obj.drawPoints.forEach(point => {
                if (point != obj.drawPoints[0]) {
                    context.lineTo(this.position.x + point.x, this.position.y + point.y)
                }
            });

            context.closePath();
            this.setDrawModes(context, "#ffffff", this.fillColour);
        });
    }

    drawByPixel(context) {
        Object.values(this.drawObject).forEach(obj => {
            context.beginPath();
            obj.drawPoints.forEach(drawPoint => {
                context.rect(this.position.x + drawPoint.x, this.position.y + drawPoint.y, 1, 1);
            });
            context.closePath();
            this.setDrawModes(context, "", this.fillColour);
        });
    }

    setDrawModes(context, strokeStyle, fillStyle) {
        if (strokeStyle != "") {
            context.strokeStyle = strokeStyle
            context.stroke();
        }
        if (fillStyle != "") {
            context.fillStyle = fillStyle
            context.fill();
        }
    }
}