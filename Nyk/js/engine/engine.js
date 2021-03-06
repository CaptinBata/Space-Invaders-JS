class Engine {
    static keys = [];
    debug = false;
    runGame = true;
    frameId = 0;
    static fps = 0;
    static coRoutines = [];
    constructor() {
        this.setupCanvas();
        this.setupEvents();
        this.debugObject = new DebugObject(0, 0, Engine.playableArea);
    }

    setGame(game) {
        this.runGame = true;

        this.game = game;
    }

    start() {
        this.gameLoop();
    }

    stop() {
        window.cancelAnimationFrame(this.frameId);

        this.runGame = false;
        Engine.coRoutines = [];
        Engine.keys = [];

        this.game.destructor();
        delete this.game;
    }

    static startCoRoutine(coRoutine) {
        Engine.coRoutines.push(coRoutine);
    }

    static getWindowWidth() {
        return window.innerWidth - 25;
    };

    static getWindowHeight() {
        return window.innerHeight - 25;
    };

    static setGlobalAlpha(value) {
        Engine.context.save();
        Engine.context.globalAlpha = value;
    }

    static restoreGlobalAlpha() {
        Engine.context.restore();
    }

    draw() {
        this.clearScreen();
        this.game.draw();
        this.drawDebug();
    }

    drawDebug() {
        if (this.debug) {
            this.game.gameObjects.forEach(gameObject => this.debugObject.drawObjectBounds(gameObject))
            this.debugObject.draw();
        }
    }

    update(timestamp) {
        this.game.update();

        this.checkDebug();

        this.debugObject.update(timestamp);

        Engine.fps = this.debugObject.getFPS();

        Engine.keys = [];
    }

    executeCoRoutines() {
        Engine.coRoutines.forEach(coRoutine => {
            if (coRoutine.next().done)
                Utilities.removeElement(Engine.coRoutines, coRoutine)
        })
    }

    gameLoop(timestamp) { //This is passed in by requestAnimationFrame. Is the time when the frame was called in relation to the start of the execution of the game in milliseconds
        if (this.runGame) {
            this.update(timestamp);

            this.executeCoRoutines();

            this.draw();

            this.frameId = window.requestAnimationFrame(this.gameLoop.bind(this));
        }
    }

    checkDebug() {
        Engine.keys.forEach(key => {
            switch (key) {
                case "q":
                    this.debug = !this.debug; //toggle debug mode
                    Utilities.removeElement(Engine.keys, key); //delete the key from the list, so other things can't use it's value. Stops two things from using one press
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
        Engine.canvas = document.getElementById("gameCanvas");
        Engine.canvas.width = Engine.getWindowWidth();
        Engine.canvas.height = Engine.getWindowHeight();

        Engine.context = Engine.canvas.getContext("2d");

        Engine.playableArea = {
            min: new Vector(Engine.getWindowWidth() * 0.15, Engine.getWindowHeight() * 0.10),
            max: new Vector(Engine.getWindowWidth() * 0.85, Engine.getWindowHeight() * 0.90)
        }

        this.clearScreen();
    }


    clearScreen() {
        Engine.context.clearRect(0, 0, Engine.canvas.width, Engine.canvas.height);
        Engine.context.fillStyle = "#000000";
        Engine.context.fillRect(0, 0, Engine.canvas.width, Engine.canvas.height);
    };
}