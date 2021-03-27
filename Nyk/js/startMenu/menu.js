class Menu extends IGame {
    constructor() {
        super();
        this.circlePointCount = 30;

        let playableArea = Engine.playableArea

        this.circleCentre = new Vector(playableArea.min.x + ((playableArea.max.x - playableArea.min.x) / 2),
            playableArea.min.y + ((playableArea.max.y - playableArea.min.y) / 2))

        this.generateCircle(200, this.circlePointCount)

        Engine.startCoRoutine(this.rotateCircle());
        Engine.startCoRoutine(this.changeRadius());
    }

    destructor() {
        IGame.prototype.destructor.call(this) //call the parent destructor first, then do some extra shit for this class
        delete this.circleCentre;
        delete this.circlePointCount;
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
        let circle = this.filterGameObjects("Circle")
        let rotation = 0.5;

        yield null;
        yield null; //We want to skip some frames to the fps of the game can be calculated.

        let rotationAmount = 1.44 / Engine.fps;
        console.log(rotationAmount)
        while (circle.length > 0) {
            if (rotation < 1)
                rotation += rotationAmount;

            circle.forEach(point => {
                point.rotateAroundPoint(this.circleCentre, rotation)
                point.rotation += rotation;

                if (point.toDelete)
                    Utilities.removeElement(circle, point)
            })
            yield null;
        }
    }

    filterGameObjects(type) {
        return this.gameObjects.filter(gameObject => gameObject.type == type)
    }

    generateStars(radius) {
        for (let i = 0; i < 5; i++) {
            let colliding = false;
            let stars = this.filterGameObjects("Star")

            let spawn = new Vector(
                Utilities.getRandomInt(this.circleCentre.x - radius, this.circleCentre.x + radius),
                Utilities.getRandomInt(this.circleCentre.y - radius, this.circleCentre.y + radius)
            )
            let newStar = new Star("Star", spawn.x, spawn.y, 0, 0)

            stars.forEach(star => {
                if (star.detectAABBCollision(newStar))
                    colliding = true;
            })

            if (!colliding)
                this.gameObjects.push(newStar);
        }
    }

    *changeRadius() { //declaration of a generator
        let circle = this.filterGameObjects("Circle")
        let increase = false
        let currentRadius = 0;
        while (circle.length > 0) {
            circle.forEach(point => {
                if (point.radius > 15 && !increase)
                    point.radius -= 1;
                else {
                    point.radius += 10;
                    increase = true;
                }
                currentRadius = point.radius;

                let newPoint = this.generatePoint(point.rotation, point.radius);
                point.position = new Vector(this.circleCentre.x + newPoint.x, this.circleCentre.y + newPoint.y);

                if (point.position.x > Engine.getWindowWidth()
                    || point.position.y > Engine.getWindowHeight()
                    || point.position.x < 0
                    || point.position.y < 0) {
                    point.toDelete = true;
                    Utilities.removeElement(circle, point)
                }
            })
            if (increase)
                this.generateStars(currentRadius);

            yield null;
        }
        this.spawnLogo();
    }

    spawnLogo() {
        let direction = new Vector(Utilities.getRandomInt(-4, -2), Utilities.getRandomInt(2, 4))
        this.filterGameObjects("Star").forEach(star => {
            star.direction = direction;
            star.setMove(true);
        })

        this.gameObjects.push(new Logo(Engine.playableArea.min.x, Engine.playableArea.min.y, "assets/logo.png"))
        this.gameObjects.push(new Button(100, 100, "startGame"))
    }
}