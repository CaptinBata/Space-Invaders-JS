class Menu extends IGame {
    constructor(engineRef) {
        super();
        this.circlePointCount = 30;

        this.engineRef = engineRef;
        let playableArea = engineRef.playableArea

        this.circleCentre = new Vector(playableArea.min.x + ((playableArea.max.x - playableArea.min.x) / 2),
            playableArea.min.y + ((playableArea.max.y - playableArea.min.y) / 2))
        this.generateCircle(200, this.circlePointCount)

        Engine.startCoRoutine(this.rotateCircle());
        Engine.startCoRoutine(this.changeRadius());
    }

    generateCircle(radius, pointCount) {
        this.incDegrees = 360 / pointCount;

        for (var nCount = 0; nCount < pointCount; nCount++) {
            let degree = nCount * this.incDegrees;
            let point = this.generatePoint(degree, radius);
            this.gameObjects.push(new Star("Circle", this.circleCentre.x + point.x, this.circleCentre.y + point.y, degree, radius))
        }
    }

    generatePoint(degree, radius) {
        let radians = degree * (Math.PI / 180);

        let x = Math.cos(radians) * radius;
        let y = Math.sin(radians) * radius;

        return new Vector(x, y);
    }

    *rotateCircle() { //declaration of a generator
        let circle = this.gameObjects.filter(gameObject => gameObject.type = "Circle")

        while (circle.length > 0) {
            circle.forEach(point => {
                this.rotatePoint(point, 0.5)
                if (point == undefined)
                    Utilities.removeElement(circle, point)
            })
            yield null;
        }
    }

    *changeRadius() { //declaration of a generator
        let circle = this.gameObjects.filter(gameObject => gameObject.type = "Circle")
        let increase = false
        while (circle.length > 0) {
            circle.forEach(point => {
                if (point.radius > 15 && !increase)
                    point.radius -= 0.25;
                else {
                    point.radius += 2;
                    increase = true;
                }

                let newPoint = this.generatePoint(point.rotation, point.radius);
                point.position = new Vector(this.circleCentre.x + newPoint.x, this.circleCentre.y + newPoint.y);

                if (point == undefined)
                    Utilities.removeElement(circle, point)
            })
            yield null;
        }
    }

    rotatePoint(point, angle) {
        let radians = angle * (Math.PI / 180);

        let sine = Math.sin(radians);
        let cosine = Math.cos(radians);

        point.position.x -= this.circleCentre.x;
        point.position.y -= this.circleCentre.y;

        let newX = point.position.x * cosine - point.position.y * sine;
        let newY = point.position.x * sine + point.position.y * cosine;

        point.position.x = newX + this.circleCentre.x
        point.position.y = newY + this.circleCentre.y;

        point.rotation += angle;
    }

}