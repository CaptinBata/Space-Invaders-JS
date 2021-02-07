class Button extends GameObject {
    constructor(x, y, id) {
        super(x, y);

        this.startButton = document.getElementById(id);

        let width = parseInt(this.startButton.clientWidth);
        let height = parseInt(this.startButton.clientHeight);
        let halfXPoint = Engine.getWindowWidth() / 2;

        x = halfXPoint - (width / 2);
        y = Engine.playableArea.min.y - (height + height * .625);

        this.position = new Vector(x, y);

        this.startButton.style.left = x;
        this.startButton.style.bottom = y;

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
        this.startButton.parentNode.removeChild(this.startButton);
    }

    update(gameObjects) {
        if (this.opacity < 1) {
            this.opacity += this.transitionRate;
            this.startButton.style.opacity = this.opacity;
        }
    }
}