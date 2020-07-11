class Game {
    constructor() {
        this.SetupCanvas();
    }

    SetupCanvas() {
        this.canvas = document.getElementById("gameCanvas");
        this.canvas.width = this.GetWindowWidth();
        this.canvas.height = this.GetWindowHeight();
        this.context = this.canvas.getContext("2d");
    }

    GetWindowWidth() {
        return window.innerWidth - 25;
    };
    GetWindowHeight() {
        return window.innerHeight - 25;
    };

    main() {

    }
}

let game = new Game()
game.main();