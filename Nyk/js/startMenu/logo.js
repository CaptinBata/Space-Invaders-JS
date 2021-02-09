class Logo extends opacityAnimationObject {
    constructor(x, y, filePath) {
        super(x, y)
        let playableAreaDiffX = Engine.playableArea.max.x - Engine.playableArea.min.x
        let playableAreaDiffY = Engine.playableArea.max.y - Engine.playableArea.min.y

        this.filePath = filePath;
        this.image = new Image(
            playableAreaDiffX,
            playableAreaDiffY
        );
        this.image.src = filePath;
        this.opacity = 0;

        this.transitionRate = 3 / (3 * Engine.fps); // 3 seconds / (Amount of frames in 3 seconds)

        this.setDrawObject({
            "main": {
                "drawPoints": [
                    new Vector(0, 0),
                ],
                "fillColour": "#000000",
                "strokeColour": "#000000",
            }
        })
    }

    destructor() {
        GameObject.prototype.destructor.call(this) //call the parent destructor first, then do some extra shit for this class
        delete this.image;
    }

    draw() {
        Engine.setGlobalAlpha(this.opacity);
        Engine.context.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
        Engine.restoreGlobalAlpha();
    }
}