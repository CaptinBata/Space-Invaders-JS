class IGame {
    gameObjects = [];
    score = 0;
    constructor() {
    }

    destructor() {
        this.gameObjects.forEach(gameObject => {
            gameObject.destructor();
        })
        this.gameObjects = [];
    }

    checkDelete() {
        this.gameObjects.forEach(gameObject => {
            gameObject.checkDelete(this.gameObjects);
            if (gameObject.toDelete) {
                if (gameObject instanceof Alien)
                    this.score += gameObject.pointValue;
                Utilities.removeElement(this.gameObjects, gameObject);
            }
        })
    }

    update() {
        this.gameObjects.forEach(gameObject => {
            gameObject.update(this.gameObjects)
        })

        this.checkDelete();
    }

    draw() {
        this.gameObjects.forEach(gameObject => gameObject.draw())
    }
}