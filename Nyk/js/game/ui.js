class UI extends GameObject {
    //time between noises 0.8 seconds
    constructor(x, y, gameObjects, runState) {
        super(x, y);
        this.musicBeats = [
            new Audio("assets/music/Music_1.wav"),
            new Audio("assets/music/Music_2.wav"),
            new Audio("assets/music/Music_3.wav"),
            new Audio("assets/music/Music_4.wav")
        ];
        this.score = 0;

        this.musicBeats.forEach(beat => {
            beat.c
        });

        this.runState = runState;
        Engine.startCoRoutine(this.playMusic(gameObjects));

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

    *playMusic(gameObjects) {
        let songSpeed = 0.8; //The amount of time between each note of the music in the og game
        let aliens = gameObjects.find(gameObject => gameObject instanceof Alien);
        let songDifference = 0.8 / aliens.length;
        let timestamp = Date.now();
        let musicCount = 0;

        while (this.runState) {
            let now = Date.now()
            let timetaken = now - timestamp;

            aliens = gameObjects.find(gameObject => gameObject instanceof Alien);

            if (timetaken >= aliens.length * songDifference) {
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