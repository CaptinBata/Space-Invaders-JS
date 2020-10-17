class Game {
    keys = [];
    debug = false;
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

        this.aliens = []
        this.shields = [];

        let alienWidth = new Alien(0, 0, 1).getWidth(); //Used for spacing
        let alienHeight = new Alien(0, 0, 1).getHeight(); //Used for spacing

        let alienRowSpacing = alienWidth * 1.5;
        let alienColumnSpacing = alienHeight * 1.5;

        let shieldSpacing = this.getWindowWidth() / 4;

        for (let i = 0; i < 4; i++) {
            this.shields.push(new Shield(150 + (i * shieldSpacing), this.getWindowHeight() - 200))
        }

        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 15; x++) {
                this.aliens.push(new Alien(250 + (x * alienRowSpacing), (this.getWindowHeight() * 0.25) - (y * alienColumnSpacing), y));
            }
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
        this.checkDebug(this.keys);
        this.keys = [];
    }

    checkDebug(keys) {
        keys.forEach(key => {
            switch (key) {
                case "q":
                    this.debug = !this.debug; //toggle debug mode
                    break;
            }
        })
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

        if (this.debug) {

        }
    }

    main() {
        this.setupGame();
        this.gameLoop();
    }
}

let game = new Game()
game.main();