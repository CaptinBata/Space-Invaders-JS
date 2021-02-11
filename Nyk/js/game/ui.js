class UI extends GameObject {
    //time between noises 0.8 seconds
    constructor(x, y, gameObjects, runState, score, lives) {
        super(x, y);
        this.musicBeats = [
            new Audio("assets/music/Music_1.ogg"),
            new Audio("assets/music/Music_2.ogg"),
            new Audio("assets/music/Music_3.ogg"),
            new Audio("assets/music/Music_4.ogg")
        ];

        this.score = score;
        this.lives = lives;
        this.runState = runState;

        Engine.startCoRoutine(this.playMusic(gameObjects));

        this.setDrawObject({
            "life_1": {
                "drawPoints": this.adjustObjectPosition(new Vector(Engine.getWindowWidth() * 0.05804, -(Engine.getWindowHeight() * 0.03001))),
                "x_scale": 0.05804,
                "y_scale": 0.03001,
                "fillColour": "#ffffff",
                "strokeColour": "#ffffff",
            },
            "life_2": {
                "drawPoints": this.adjustObjectPosition(new Vector(Engine.getWindowWidth() * 0.10026, -(Engine.getWindowHeight() * 0.03001))),
                "x_scale": 0.10026,
                "y_scale": 0.03001,
                "fillColour": "#ffffff",
                "strokeColour": "#ffffff",
            },
            "life_3": {
                "drawPoints": this.adjustObjectPosition(new Vector(Engine.getWindowWidth() * 0.14248, -(Engine.getWindowHeight() * 0.03001))),
                "x_scale": 0.14248,
                "y_scale": 0.03001,
                "fillColour": "#ffffff",
                "strokeColour": "#ffffff",
            }
        })
    }

    resetPositionForScaleChange() {
        Object.values(this.drawObject).forEach(drawable => {
            drawable.drawPoints = playerStructure.drawPoints;
            drawable.drawPoints = this.adjustObjectPosition(new Vector(
                Engine.getWindowWidth() * drawable.x_scale,
                -(Engine.getWindowHeight() * drawable.y_scale)))
        })
    }

    adjustObjectPosition(translateVector) {
        let vectors = [];

        playerStructure.drawPoints.forEach(vector => vectors.push(Vector.translate(vector, translateVector)))

        return vectors;
    }

    draw() {
        this.drawByLine();

        this.setDrawModes("", "#ffffff");
        Engine.context.font = "28px Gill Sans MT";

        Engine.context.fillText("Lives: ", Engine.getWindowHeight() * 0.01, Engine.getWindowHeight() * 0.99);
        Engine.context.fillText(`Score: ${this.score}`, Engine.getWindowHeight() * 0.01, Engine.getWindowHeight() * 0.05);
    }

    *playMusic(gameObjects) {
        let songSpeed = 0.8; //The amount of time between each note of the music in the og game
        let fastestDiff = 0.09;
        let aliens = gameObjects.filter(gameObject => gameObject instanceof Alien);
        let songDifference = 0.8 / aliens.length;
        let timestamp = Date.now() / 1000;
        let musicCount = 0;

        while (this.runState) {
            let now = Date.now() / 1000;
            let timetaken = now - timestamp;

            aliens = gameObjects.filter(gameObject => gameObject instanceof Alien);

            let songGap = aliens.length * songDifference
            let soundDiff = songGap > fastestDiff ? songGap : fastestDiff;

            if (timetaken >= soundDiff) {
                this.musicBeats[musicCount].play();
                musicCount++;

                if (musicCount == 4)
                    musicCount = 0;
                timestamp = now;
            }
            yield null;
        }
    }
}