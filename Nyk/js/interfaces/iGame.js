class IGame {
    gameObjects = [];
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
            if (gameObject.toDelete)
                Utilities.removeElement(this.gameObjects, gameObject);
        })
    }

    update() {
        this.gameObjects.forEach(gameObject => {
            gameObject.update(this.gameObjects)
            gameObject.checkDelete(this.gameObjects);
        })

        this.checkDelete();
    }

    draw() {
        this.gameObjects.forEach(gameObject => gameObject.draw())
    }
}