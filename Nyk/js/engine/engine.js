class Engine {
    static keys = [];
    debug = false;
    runGame = true;
    static coRoutines = [];
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

    static startCoRoutine(coRoutine) {
        Engine.coRoutines.push(coRoutine);
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
            this.game.gameObjects.forEach(gameObject => this.debugObject.drawObjectBounds(this.context, gameObject))
            this.debugObject.draw(this.context, this.getWindowWidth(), this.getWindowHeight());
        }
    }

    update(timestamp) {
        this.game.update();

        this.checkDebug();

        if (this.debug)
            this.debugObject.update(timestamp);

        Engine.keys = [];
    }

    executeCoRoutines() {
        Engine.coRoutines.forEach(coRoutine => {
            if (coRoutine.next().done)
                Utilities.removeElement(this.coRoutines, coRoutine)
        })
    }

    gameLoop(timestamp) { //This is passed in by requestAnimationFrame. Is the time when the frame was called in relation to the start of the execution of the game in milliseconds
        if (this.runGame) {
            this.update(timestamp);

            this.executeCoRoutines();

            this.draw();

            window.requestAnimationFrame(this.gameLoop.bind(this));
        }
    }

    checkDebug(keys) {
        Engine.keys.forEach(key => {
            switch (key) {
                case "q":
                    this.debug = !this.debug; //toggle debug mode
                    Utilities.removeElement(keys, key); //delete the key from the list, so other things can't use it's value. Stops two things from using one press
                    break;
            }
        })
    }

    setupEvents() {
        window.addEventListener("keydown", (e) => {
            Engine.keys.push(e.key);
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