class Circle extends GameObject {
    constructor(points, radius, x, y) {
        super(x, y);
        this.points = points;
        this.radius = radius
        this.setDrawObject({
            "main": {
                "drawPoints": this.generateCircle(50, 25),
                "fillColour": "#ffffff",
                "strokeColour": "#ffffff",
            }
        })
    }

    generateCircle(radius, pointCount) {
        let incDegrees = 360 / pointCount;
        let points = [];

        for (var nCount = 0; nCount < pointCount; nCount++) {
            points.push(this.generatePoint(nCount, incDegrees, radius));
        }

        return points;
    }

    generatePoint(count, incDegrees, radius) {
        let degree = count * incDegrees;
        let radians = degree * (Math.PI / 180);

        let x = Math.cos(radians) * radius;
        let y = Math.sin(radians) * radius;

        return new Vector(x, y);
    }
}