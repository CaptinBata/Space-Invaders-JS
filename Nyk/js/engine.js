class Engine {
    keys = [];
    debug = false;
    constructor() {
        this.setupCanvas();
        this.setupEvents();
        this.debugObject = new DebugObject(0, 0, this.playableArea);
    }

    setGame(game) {
        this.game = game;
    }

    start() {
        this.gameLoop();
    }

    getWindowWidth() {
        return window.innerWidth - 25;
    };

    getWindowHeight() {
        return window.innerHeight - 25;
    };

    draw() {
        this.clearScreen();
        this.game.draw();
        this.drawDebug();
    }

    drawDebug() {
        if (this.debug) {
            this.debugObject.drawObjectBounds(this.context, this.player)

            this.shields.forEach(shield => {
                this.debugObject.drawObjectBounds(this.context, shield)
            })

            this.aliens.forEach(alien => {
                this.debugObject.drawObjectBounds(this.context, alien)
            })

            this.debugObject.draw(this.context, this.getWindowWidth(), this.getWindowHeight());
        }
    }

    gameLoop(timestamp) { //This is passed in by requestAnimationFrame. Is the time when the frame was called in relation to the start of the execution of the game in milliseconds
        this.game.update();
        // Add Co-Routines here

        this.checkDebug(this.keys);

        this.draw();

        this.keys = [];

        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    checkDebug(keys) {
        keys.forEach(key => {
            switch (key) {
                case "q":
                    this.debug = !this.debug; //toggle debug mode
                    Utilities.removeElement(keys, key); //delete the key from the list, so other things can't use it's value. Stops two things from using one press
                    break;
            }
        })
        if (this.debug)
            this.debugObject.update(timestamp);
    }

    setupEvents() {
        window.addEventListener("keydown", (e) => {
            this.keys.push(e.key);
        })
        window.addEventListener("resize", () => {
            this.setupCanvas();
        })
    }

    setupCanvas() {
        this.canvas = document.getElementById("gameCanvas");
        this.canvas.width = this.getWindowWidth();
        this.canvas.height = this.getWindowHeight();

        this.context = this.canvas.getContext("2d");

        this.playableArea = {
            min: new Vector(this.getWindowWidth() * 0.15, this.getWindowHeight() * 0.10),
            max: new Vector(this.getWindowWidth() * 0.85, this.getWindowHeight() * 0.90)
        }

        this.clearScreen();
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
}