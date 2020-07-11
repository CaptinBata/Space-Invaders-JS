class Game {
    constructor() {
        this.SetupCanvas();
    }

    setupCanvas() {
        this.canvas = document.getElementById("gameCanvas");
        this.canvas.width = this.GetWindowWidth();
        this.canvas.height = this.GetWindowHeight();
        this.context = this.canvas.getContext("2d");
        this.ClearScreen();
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

    main() {

    }
}

let game = new Game()
game.main();