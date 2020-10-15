class Game {
    keys = [];
    constructor() {
        this.setupCanvas();
        this.setupEvents();
    }

    setupCanvas() {
        this.canvas = document.getElementById("gameCanvas");
        this.canvas.width = this.getWindowWidth();
        this.canvas.height = this.getWindowHeight();
        this.context = this.canvas.getContext("2d");
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

    setupGame() {
        this.player = new Player(this.getWindowWidth() / 2, this.getWindowHeight() - 30)
        this.shields = [];
        this.seperation = this.getWindowWidth() / 4;

        for (let i = 0; i < 4; i++) {
            this.shields.push(new Shield(150 + (i * this.seperation), this.getWindowHeight() - 200))
        }
    }

    gameLoop() {
        this.update();
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

    update() {
        this.player.update(this.keys);
        this.shields.forEach(shield => {
            this.player.getBullets().forEach(bullet => {
                shield.update(bullet);
            })
        });

        this.checkDelete();
        this.keys = []; //clear the array for the next frame
    }

    draw() {
        this.clearScreen();
        this.player.draw(this.context);
        this.shields.forEach(shield => {
            shield.draw(this.context)
        })
    }

    main() {
        this.setupGame();
        this.gameLoop();
    }
}

let game = new Game()
game.main();