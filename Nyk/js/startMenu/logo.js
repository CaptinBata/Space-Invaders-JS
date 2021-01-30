class Logo extends GameObject {
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
        this.image.style.opacity = 0;

        this.setDrawObject({
            "main": {
                "drawPoints": [
                    new Vector(0, 0),
                ],
                "fillColour": "#ffffff",
                "strokeColour": "#ffffff",
            }
        })
    }

    update(gameObjects) {
        if (this.image.style.opacity < 1)
            this.image.style.opacity += 0.001;
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
    }
}