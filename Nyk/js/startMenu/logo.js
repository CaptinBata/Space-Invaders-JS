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
        this.opacity = 0;

        this.transitionRate = 3 / (3 * Engine.fps); // 3 seconds / (Amount of frames in 3 seconds)

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

    setImageOpacity() {
        this.image.setAttribute("style", `opacity:${this.opacity}; -moz-opacity:${this.opacity}; filter:alpha(opacity=${this.opacity})`)
    }

    update(gameObjects) {
        if (this.opacity < 1) {
            this.opacity += this.transitionRate;
        }
    }

    draw(context) {
        context.save();
        context.globalAlpha = this.opacity;
        context.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
        context.restore();
    }
}