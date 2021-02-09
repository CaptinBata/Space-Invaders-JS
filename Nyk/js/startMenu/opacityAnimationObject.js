class opacityAnimationObject extends GameObject {
    constructor(x, y) {
        super(x, y);
    }

    update(gameObjects) {
        if (this.opacity < 1) {
            this.opacity += this.transitionRate;
        }
    }
}