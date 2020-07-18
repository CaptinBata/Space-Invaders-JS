class GameObject {
    drawPoints = [];
    position = null;
    fillColour = "#ffffff"

    constructor(x, y) {
        this.position = new Vector(x, y);
    }

    draw(context) {
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

        context.fillStyle = fillStyle
        context.fill();
    }
}