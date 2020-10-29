class Game {
    keys = [];
    debug = false;
    constructor() {
        this.setupCanvas();
        this.setupEvents();
        this.debugObject = new DebugObject(0, 0, this.playableArea);
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

    setupEvents() {
        window.addEventListener("keydown", (e) => {
            this.keys.push(e.key);
        })
        window.addEventListener("resize", () => {
            this.setupCanvas();
        })
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    getWindowWidth() {
        return window.innerWidth - 25;
    };

    getWindowHeight() {
        return window.innerHeight - 25;
    };

    setupPlayer() {
        let playerHeight = new Player(0, 0).getHeight();
        let playerMidPosition = this.playableArea.min.x + ((this.playableArea.max.x - this.playableArea.min.x) / 2);

        this.player = new Player(playerMidPosition, this.playableArea.max.y - (playerHeight * 0.5))
    }

    setupAliens() {
        this.aliens = [];

        let alienForSpacing = new Alien(0, 0, 0);
        let alienWidth = alienForSpacing.getWidth();
        let alienHeight = alienForSpacing.getHeight();

        let alienRowSpacing = alienWidth * 1.5;
        let alienColumnSpacing = alienHeight * 1.5;
        let aliensPerRow = Math.round((this.playableArea.max.x - this.playableArea.min.x) / alienRowSpacing);

        let alienStartXPoint = this.playableArea.min.x + (alienWidth * 0.5);
        let alienStartYPoint = this.playableArea.min.y + (alienHeight * 0.5);

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < aliensPerRow; x++) {
                this.aliens.push(new Alien(alienStartXPoint + (x * alienRowSpacing), alienStartYPoint + (y * alienColumnSpacing), y))
            }
        }
    }

    setupShields() {
        this.shields = [];

        let shieldForSpacing = new Shield(0, 0);
        let shieldWidth = shieldForSpacing.getWidth();
        let shieldHeight = shieldForSpacing.getHeight();

        let shieldSpacing = Math.round((this.playableArea.max.x - this.playableArea.min.x) / 4)
        let shieldXStartPoint = this.playableArea.min.x + (shieldWidth * 0.5);
        let shieldYStartPoint = this.playableArea.max.y * 0.8;

        for (let x = 0; x < 4; x++) {
            this.shields.push(new Shield(shieldXStartPoint + shieldSpacing * x, shieldYStartPoint))
        }
    }

    setupGame() {
        this.setupPlayer();
        this.setupAliens();
        this.setupShields();
    }

    gameLoop(timestamp) { //This is passed in by requestAnimationFrame. Is the time when the frame was called in relation to the start of the execution of the game in milliseconds
        this.update(timestamp);
        this.draw();
        window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    checkDelete() {
        this.shields.forEach(shield => {
            shield.checkDelete();
            if (shield.toDelete)
                Utilities.removeElement(this.shields, shield);
        });

        this.player.checkDelete();
        if (this.player.toDelete)
            delete this.player;
    }

    update(timestamp) {
        this.player.update(this.keys);
        this.shields.forEach(shield => {
            this.player.getBullets().forEach(bullet => {
                shield.update(bullet);
            })
        });

        this.checkDelete();
        this.checkDebug(this.keys);
        if (this.debug)
            this.debugObject.update(timestamp);
        this.keys = [];
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

    draw() {
        this.clearScreen();

        this.player.draw(this.context);

        this.shields.forEach(shield => {
            shield.draw(this.context)
        })

        this.aliens.forEach(alien => {
            alien.draw(this.context)
        })

        this.drawDebug();
    }

    main() {
        this.setupGame();
        this.gameLoop();
    }
}

let game = new Game()
game.main();