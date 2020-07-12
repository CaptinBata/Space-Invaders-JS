class GameObject {
    drawPoints = [];
    position = null;
    fillColour = "#ffffff"

    constructor(x, y, drawPoints) {
        this.drawPoints = drawPoints;
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
        context.strokeStyle = "#ffffff";
        context.stroke();
        context.fillStyle = this.fillColour;
        context.fill();
    }
}