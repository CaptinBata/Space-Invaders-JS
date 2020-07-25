class GameObject {
    drawPoints = [];
    position = null;
    fillColour = "#ffffff"
    minMax = {};

    constructor(x, y) {
        this.position = new Vector(x, y);
    }

    setDrawPoints(points) {
        this.drawPoints = points;
        this.getObjectBounds();
    }

    getObjectBounds() { //Used to find the AABB (Axis-Aligned Bounding Box). Basically the basic box around the object to be used as primitive hit detection
        min = new Vector(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        max = new vector(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

        this.drawPoints.forEach(point => {
            if (point.x < min.x)
                min = new Vector(point.x, min.y)
            if (point.y < min.y)
                min = new Vector(min.x, point.y)

            if (point.x > max.x)
                min = new Vector(point.x, max.y)
            if (point.y > max.y)
                min = new Vector(max.x, point.y)
        });

        this.minMax = {
            min: min,
            max: max
        }
    }

    draw(context) {
        this.drawByLine(context);
    }

    drawByLine(context) {
        context.beginPath();
        context.moveTo(this.position.x + this.drawPoints[0].x, this.position.y + this.drawPoints[0].y);
        this.drawPoints.forEach(point => {
            if (point != this.drawPoints[0]) {
                context.lineTo(this.position.x + point.x, this.position.y + point.y)
            }
        });

        context.closePath();
        this.setDrawModes(context, "#ffffff", this.fillColour);
    }

    drawByPixel(context) {
        context.beginPath();
        this.drawPoints.forEach(drawPoint => {
            context.rect(this.position.x + drawPoint.x, this.position.y + drawPoint.y, 1, 1);
        });
        context.closePath();
        this.setDrawModes(context, "", this.fillColour);
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