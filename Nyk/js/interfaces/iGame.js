class IGame {
    gameObjects = [];
    constructor() {
    }

    checkDelete() {
        this.gameObjects.forEach(gameObject => {
            gameObject.checkDelete(this.gameObjects);
            if (gameObject.toDelete)
                Utilities.removeElement(this.gameObjects, gameObject);
        })
    }

    update() {
        this.gameObjects.forEach(gameObject => {
            gameObject.update(this.gameObjects)
        })

        this.checkDelete();
    }

    draw() {
        this.gameObjects.forEach(gameObject => gameObject.draw(Engine.context))
    }
}